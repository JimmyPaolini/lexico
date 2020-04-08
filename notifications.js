const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, TopicArn, PhoneNumber } = require('./secrets/aws_credentials')
const sns = new AWS.SNS({accessKeyId, secretAccessKey, region})

async function emailMe(Subject, Message = ' ') {
    return await sns.publish({TopicArn, Message, Subject}).promise()
}

async function textMe(Message) {
    return await sns.publish({PhoneNumber, Message}).promise()
}

module.exports = { emailMe, textMe }