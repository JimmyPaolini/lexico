const fs = require('fs'), chalk = require('chalk')
const {google} = require('googleapis'), readline = require('readline')

const {client_secret, client_id, redirect_uris, spreadsheetId, sheetIds} = require('../../secrets/google_credentials').web
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
try { oAuth2Client.setCredentials(require('../../secrets/google_token.json')) }
catch (e) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    console.log('Authorize this app by visiting this url:', authUrl)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close()
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err)
            oAuth2Client.setCredentials(token)
            // Store the token to disk for later program executions
            fs.writeFile('./ingestion/secrets/google_token.json', JSON.stringify(token), (err) => {
                if (err) return console.error(err)
                return console.log('Token stored to ./ingestion/secrets/google_token.json')
            })
        })
    })
}

google.options({
    auth: oAuth2Client,
    agent: new (require('https')).Agent({ keepAlive: true })
})
const spreadsheet = google.sheets({version: 'v4'}).spreadsheets

async function appendRowsToSpreadsheet(rows) {
    if (!rows.length) return
    let letter = getLetter(rows[0][1].split('","')[1].split('")')[0])
    await spreadsheet.values.append({ spreadsheetId,
        valueInputOption: 'USER_ENTERED', insertDataOption: 'INSERT_ROWS',
        range: letter + '!A1', resource: { values: rows }
    })
}

function entriesToRows(entries) {
    function formsFlatten(forms) {
        const flattened = []
        function findFormRec(obj) {
            if (obj instanceof Array) flattened.push(...obj)
            else for (const key of Object.keys(obj)) findFormRec(obj[key])
        }
        findFormRec(forms)
        return flattened
    }
    const rows = []
    for (const entry of entries) {
        for (const etymology of entry.etymologies) {
            if (etymology.inflection === 'inflection') continue
            console.log(chalk.blue(`Transferring "${entry.word}" - ${etymology.partOfSpeech}`))
            const row = []
            row.push((new Date()).toLocaleString())
            row.push(`=HYPERLINK("${entry.href}","${entry.word}")`)
            row.push(etymology.partOfSpeech)
            row.push(etymology.inflection)
            row.push(etymology.principalParts ? etymology.principalParts.map(pp => pp.split(': ')[1]).join(', ') : '')
            row.push(etymology.translations.map(translation => translation.replace(/\s*{\*.*\*}\s*/g, '')).join('; '))
            row.push(etymology.pronunciation.classical.phonemes)
            row.push(Array.isArray(etymology.forms) ? etymology.forms.map(form => form.join(' ')).join('; ') :
                (etymology.forms ? formsFlatten(etymology.forms).join(', ') : ''))
            row.push(etymology.etymology)
            rows.push(row)
        }
    }
    return rows
}

async function clearTable(letter) {
    await spreadsheet.batchUpdate({ spreadsheetId,
        resource: {
            "requests": [
                {
                    "insertDimension": {
                        "range": {
                            "sheetId": sheetIds[letter],
                            "dimension": "ROWS",
                            "startIndex": 2,
                            "endIndex": 3
                        },
                        "inheritFromBefore": true
                    }
                },
            ],
        }
    })
    await spreadsheet.batchUpdate({ spreadsheetId,
        resource: {
            requests: [
                {
                    'deleteDimension': {
                        'range': {
                            'sheetId': sheetIds[letter],
                            'dimension': 'ROWS',
                            'startIndex': 3,
                            'endIndex': 10000
                        }
                    }
                }
            ]
        }
    })
    console.log(chalk.yellow(`Cleared table: "${letter}"`))
}

async function sortTable(letter) {
    await spreadsheet.batchUpdate({spreadsheetId,
        resource: {
            requests: [
                {
                    'sortRange': {
                        'range': {
                            'sheetId': sheetIds[letter],
                            'startRowIndex': 2,
                            'endRowIndex': 5000,
                            "startColumnIndex": 0,
                            "endColumnIndex": 9
                        },
                        "sortSpecs": [
                            {
                                "dimensionIndex": 1,
                                "sortOrder": "ASCENDING"
                            }
                        ]
                    }
                }
            ]
        }
    })
    console.log(chalk.yellow(`Sorted table: "${letter}"`))
}

function getLetter(word) {
    const [l1, l2, ..._] = word.split('')
    if (!l1.match(/[a-z-]/) && !l1.match(/[a-z-]/)) return '*'
    if (l1 === '-') return l2
    else return l1
}

module.exports = { appendRowsToSpreadsheet, entriesToRows, getLetter, clearTable, sortTable }