const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')

const {client_secret, client_id, redirect_uris, spreadsheetId, sheetIds} = require('../secrets/google_credentials').web
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
try { oAuth2Client.setCredentials(require('../secrets/google_token.json')) }
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
    let letter = rows[0][1].split('","')[1].slice(0,1).toLowerCase()
    if (letter === '-') letter = rows[0][1].split('","')[1].slice(1,2).toLowerCase()
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
        console.log("\x1b[34m", `Transferring "${entry.word}" - ${
            entry.etymologies.map(etymology => etymology.partOfSpeech).join(', ')}`)
        for (const etymology of entry.etymologies) {
            const row = []
            row.push((new Date()).toLocaleString())
            row.push(`=HYPERLINK("${entry.href}","${entry.word}")`)
            row.push(etymology.partOfSpeech)
            row.push(etymology.inflection)
            row.push(etymology.principalParts ? etymology.principalParts.map(pp => pp.split(': ')[1]).join(', ') : '')
            row.push(etymology.translations.map(translation => translation.replace(/{\*.*\*}/g, '')).join('; '))
            row.push(etymology.pronunciation ? `C: ${etymology.pronunciation.classical.phonemes
                .map(phoneme => phoneme.replace(/\s+/g,'')).join(',')}; E: ${
                etymology.pronunciation.ecclesiastical.phonemes.map(phoneme => phoneme.replace(/\s+/g,'')).join(',')}`:'')
            row.push(etymology.etymology)
            row.push(Array.isArray(etymology.forms) ? etymology.forms.map(form => form.join(' ')).join('; ') :
                (etymology.forms ? formsFlatten(etymology.forms).join(', ') : ''))
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
}

module.exports = { appendRowsToSpreadsheet, entriesToRows, clearTable, sortTable }