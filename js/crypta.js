function mod(value, modulo) {
    return ((value % modulo) + modulo) % modulo;
}
var Crypta = (function () {
    function Crypta() {
    }
    Crypta.Initialize = function () {
        var counter = 0;
        for (var _i = 0, _a = Crypta._ALPHABET; _i < _a.length; _i++) {
            var letter = _a[_i];
            Crypta._ALPHABET_CODES[letter] = counter++;
        }
    };
    Object.defineProperty(Crypta.prototype, "Shift", {
        get: function () {
            return this._shift;
        },
        set: function (value) {
            this._shift = value;
        },
        enumerable: true,
        configurable: true
    });
    Crypta.prototype.Transform = function (text, codeTransform) {
        var result = "";
        for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
            var letter = text_1[_i];
            var isUpper = letter.toUpperCase() == letter;
            if (isUpper)
                letter = letter.toLowerCase();
            if (!(letter in Crypta._ALPHABET_CODES)) {
                result += letter;
                continue;
            }
            var code = Crypta._ALPHABET_CODES[letter];
            var newLetter = Crypta._ALPHABET[mod(codeTransform(code), Crypta._ALPHABET.length)];
            if (isUpper)
                newLetter = newLetter.toUpperCase();
            result += newLetter;
        }
        return result;
    };
    Crypta.prototype.Encrypt = function (text) {
        var shift = this.Shift;
        return this.Transform(text, function (code) { return code + shift; });
    };
    Crypta.prototype.Decrypt = function (text) {
        var shift = this.Shift;
        return this.Transform(text, function (code) { return code - shift; });
    };
    return Crypta;
}());
Crypta._ALPHABET = "ÁÂ×ÇÄÅ£ÖÚÉÊËÌÍÎÏÐÒÓÔÕÆÈÃÞÛÝßÙØÜÀÑ";
Crypta._ALPHABET_CODES = {};
Crypta.Initialize();
function GetTextareaValue(id) {
    return document.getElementById(id).value;
}
function SetTextareaValue(id, text) {
    document.getElementById(id).value = text;
}
function GetInputValue(id) {
    return document.getElementById(id).value;
}
function EncryptText() {
    var crypta = new Crypta();
    crypta.Shift = Number(GetInputValue("shift"));
    var text = GetTextareaValue("text");
    var result = crypta.Encrypt(text);
    SetTextareaValue("encrypted", result);
}
function DecryptText() {
    var crypta = new Crypta();
    crypta.Shift = Number(GetInputValue("shift"));
    var encrypted = GetTextareaValue("encrypted");
    var result = crypta.Decrypt(encrypted);
    SetTextareaValue("text", result);
}
