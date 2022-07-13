input.onButtonPressed(Button.A, function () {
    target = control.deviceSerialNumber()
    while (target == control.deviceSerialNumber()) {
        target = ids[randint(0, ids.length - 1)]
    }
    serial.writeNumber(target)
    serial.writeLine("")
    radio.sendValue(convertToText(target), 0)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    for (let id of ids) {
        serial.writeNumber(id)
        serial.writeLine("")
    }
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
    if (name == "id") {
        if (ids.indexOf(value) < 0) {
            ids.push(value)
            basic.showNumber(ids.length)
        }
        radio.sendValue("count", ids.length)
    } else if (name == "count") {
        serial.writeNumber(ids.length)
        serial.writeLine("")
        if (value < ids.length) {
            for (let id of ids) {
                radio.sendValue("id", id)
                serial.writeValue("id", id)
            }
        }
    } else if (name == convertToText(control.deviceSerialNumber()).substr(0, 8)) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
})
let target = 0
let ids: number[] = []
radio.setGroup(1)
ids = []
ids.push(control.deviceSerialNumber())
basic.showNumber(ids.length)
radio.sendValue("id", control.deviceSerialNumber())
basic.pause(1000)
radio.sendValue("count", 1)
