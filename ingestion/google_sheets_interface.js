const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')

async function getNewToken(oAuth2Client, entry) {
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
        oAuth2Client.getToken(code, async (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err)
            oAuth2Client.setCredentials(token)
            // Store the token to disk for later program executions
            fs.writeFile('./ingestion/google_token.json', JSON.stringify(token), async (err) => {
                if (err) return console.error(err)
                console.log('Token stored to ./ingestion/google_token.json')
                return await appendEntryToSpreadsheet(entry)
            })
        })
    })
}

async function appendEntryToSpreadsheet(entry) {
    const {client_secret, client_id, redirect_uris, spreadsheet, table} = require('./google_credentials').web
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
    try { oAuth2Client.setCredentials(require('./google_token.json')) }
    catch (e) { return await getNewToken(oAuth2Client, entry) }
    let letter = entry[0][1].split('","')[1].slice(0,1).toLowerCase()
    if (letter === '-') letter = entry[0][1].split('","')[1].slice(1,2).toLowerCase()
    const appendResponse = await google.sheets({version: 'v4', auth: oAuth2Client}).spreadsheets.values.append({
        spreadsheetId: spreadsheet, range: letter + '!A1',
        valueInputOption: 'USER_ENTERED', insertDataOption: 'INSERT_ROWS',
        resource: { values: entry }
    })
    const startRowIndex = parseInt(appendResponse.data.updates.updatedRange.split('!A')[1].split(':')[0]) - 1
    const endRowIndex = startRowIndex + appendResponse.data.updates.updatedRows
    await google.sheets({version: 'v4', auth: oAuth2Client}).spreadsheets.batchUpdate({
        spreadsheetId: spreadsheet, resource: { requests: [ { 'mergeCells': {
            'mergeType': 'MERGE_COLUMNS',
            'range': {
                'sheetId': sheetIds[letter],
                'startRowIndex': startRowIndex, 'endRowIndex': endRowIndex,
                'startColumnIndex': 0, 'endColumnIndex': 2
            }
        }}]}
    })
}

const sheetIds = {
    a: "0",
    b: "1629807200",
    c: "742510624",
    d: "491736736",
    e: "751975483",
    f: "559798817",
    g: "1422681265",
    h: "1223539740",
    i: "992955607",
    j: "452570834",
    k: "45840710",
    l: "1471468959",
    m: "142445498",
    n: "503288708",
    o: "357314817",
    p: "92165915",
    q: "815715904",
    r: "391242053",
    s: "1600660464",
    t: "845582580",
    u: "1315235142",
    v: "595519934",
    w: "512391910",
    x: "72968563",
    y: "1225713831",
    z: "428790697",
}

function entryToSheetsFormat(entry) {
    const rows = []
    for (const etymology of entry.etymologies) {
        rows.push([
            (new Date()).toLocaleString(),
            `=HYPERLINK("${entry.href}","${entry.word}")`,
            etymology.partOfSpeech,
            etymology.inflection,
            etymology.principalParts ? Object.keys(etymology.principalParts).map(key => etymology.principalParts[key].join(' or ')).join(', ') : '',
            etymology.translations.map(translation => translation.translation).join('; '),
            etymology.pronunciation ? Object.keys(etymology.pronunciation).map(type =>
                `${type}: ${Object.keys(etymology.pronunciation[type]).map(ph =>
                    etymology.pronunciation[type][ph]).join(', ')}`).join('; ') : '',
            etymology.etymology,
            Array.isArray(etymology.forms) ? etymology.forms.map(form => form.join(' ')).join('; ') :
                (etymology.forms ? JSON.stringify(etymology.forms) : '')
        ])
    }
    return rows
}

module.exports = { appendEntryToSpreadsheet, entryToSheetsFormat }