function mod(value: number, modulo: number): number
{
    return ((value % modulo) + modulo) % modulo;
}

class Crypta
{
    private static _ALPHABET = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    private static _ALPHABET_CODES = {};

    private _shift: number;

    public static Initialize()
    {
        let counter = 0;
        for (let letter of Crypta._ALPHABET)
            Crypta._ALPHABET_CODES[letter] = counter++;
    }

    public get Shift(): number
    {
        return this._shift;
    }

    public set Shift(value: number)
    {
        this._shift = value;
    }

    private Transform(text: string, codeTransform: (code: number) => number): string
    {
        let result = "";
        for (let letter of text)
        {
            let isUpper = letter.toUpperCase() == letter;
            if (isUpper)
                letter = letter.toLowerCase();
            if (!(letter in Crypta._ALPHABET_CODES))
            {
                result += letter;
                continue;
            }
            let code = Crypta._ALPHABET_CODES[letter];
            let newLetter = Crypta._ALPHABET[mod(codeTransform(code), Crypta._ALPHABET.length)];

            if (isUpper)
                newLetter = newLetter.toUpperCase();
            result += newLetter;
        }
        return result;   
    }

    public Encrypt(text: string): string
    {
        let shift = this.Shift;
        return this.Transform(text, (code) => code + shift);
    }

    public Decrypt(text: string)
    {
        let shift = this.Shift;
        return this.Transform(text, (code) => code - shift);
    }
}

Crypta.Initialize();

function GetTextareaValue(id: string)
{
    return (<HTMLTextAreaElement>document.getElementById(id)).value;
}

function SetTextareaValue(id: string, text: string)
{
    (<HTMLInputElement>document.getElementById(id)).value = text;
}

function GetInputValue(id: string)
{
    return (<HTMLInputElement>document.getElementById(id)).value;
}

function EncryptText()
{
    let crypta = new Crypta();
    crypta.Shift = Number(GetInputValue("shift"));
    let text = GetTextareaValue("text");
    let result = crypta.Encrypt(text);
    SetTextareaValue("encrypted", result);
}

function DecryptText()
{
    let crypta = new Crypta();
    crypta.Shift = Number(GetInputValue("shift"));
    let encrypted = GetTextareaValue("encrypted");
    let result = crypta.Decrypt(encrypted);
    SetTextareaValue("text", result);
}