/**
 *  Created by SnakerBone on 20/11/2023.
 *  Licensed under DBaJ v2. See https://snaker.xyz/pages/license
 **/

let CodecSerializer = (function ()
{
    function CodecSerializer()
    {
        this.encoder = new Map();
        this.decoder = new Map();
    }

    CodecSerializer.prototype.put = function (key, value)
    {
        this.encoder.set(key, value);
        this.decoder.set(value, key);
    };

    Object.defineProperty(CodecSerializer.prototype, "getEncoder", {
        get: function ()
        {
            return this.encoder;
        },
        enumerable: false,
        configurable: true
    });

    Object.defineProperty(CodecSerializer.prototype, "getDecoder", {
        get: function ()
        {
            return this.decoder;
        },
        enumerable: false,
        configurable: true
    });

    return CodecSerializer;
}());
let CodecType;
(CodecType =>
{
    CodecType[CodecType["UNSET"] = -1] = "UNSET";
    CodecType[CodecType["TWO"] = 0] = "TWO";
    CodecType[CodecType["THREE"] = 1] = "THREE";
    CodecType[CodecType["FOUR"] = 2] = "FOUR";
    CodecType[CodecType["FIVE"] = 3] = "FIVE";
    CodecType[CodecType["SIX"] = 4] = "SIX";
    CodecType[CodecType["EIGHT"] = 5] = "EIGHT";
    CodecType[CodecType["TEN"] = 6] = "TEN";
    CodecType[CodecType["TWELVE"] = 7] = "TWELVE";
    CodecType[CodecType["SIXTEEN"] = 8] = "SIXTEEN";
    CodecType[CodecType["TWENTY"] = 9] = "TWENTY";
    CodecType[CodecType["SIXTY"] = 10] = "SIXTY";

})(CodecType || (CodecType = {}));

let codec = CodecType.UNSET;

const radixTen = new CodecSerializer();
const radixSixteen = new CodecSerializer();

const upload = document.getElementById("upload");
const encrypt = document.getElementById("encrypt");
const decrypt = document.getElementById("decrypt");
const copy = document.getElementById("copy");
const download = document.getElementById("download");
const clear = document.getElementById("clear");

window.addEventListener("change", event =>
{
    if (event.target.files)
    {
        upload.removeAttribute("disabled");
    }
});

window.addEventListener("load", () =>
{
    upload.setAttribute("disabled", "");
    encrypt.setAttribute("disabled", "");
    decrypt.setAttribute("disabled", "");
    copy.setAttribute("disabled", "");
    download.setAttribute("disabled", "");
    clear.setAttribute("disabled", "");

    radixTen.put("0", "000");

    radixTen.put("1", "001");
    radixTen.put("2", "010");
    radixTen.put("3", "011");
    radixTen.put("4", "100");
    radixTen.put("5", "101");
    radixTen.put("6", "110");
    radixTen.put("7", "111");

    radixTen.put("8", "002");
    radixTen.put("9", "020");
    radixTen.put("A", "022");
    radixTen.put("B", "200");
    radixTen.put("C", "202");
    radixTen.put("D", "220");
    radixTen.put("E", "222");

    radixTen.put("F", "004");
    radixTen.put("G", "040");
    radixTen.put("H", "044");
    radixTen.put("I", "400");
    radixTen.put("J", "404");
    radixTen.put("K", "440");
    radixTen.put("L", "444");

    radixTen.put("N", "008");
    radixTen.put("O", "080");
    radixTen.put("P", "088");
    radixTen.put("Q", "800");
    radixTen.put("R", "808");
    radixTen.put("S", "880");
    radixTen.put("T", "888");

    radixTen.put("U", "0016");
    radixTen.put("V", "0160");
    radixTen.put("W", "01616");
    radixTen.put("X", "1600");
    radixTen.put("Y", "16016");
    radixTen.put("Z", "16160");
    radixTen.put("a", "161616");

    radixTen.put("b", "0032");
    radixTen.put("c", "0320");
    radixTen.put("d", "03232");
    radixTen.put("e", "3200");
    radixTen.put("f", "32032");
    radixTen.put("g", "32320");
    radixTen.put("h", "323232");

    radixTen.put("i", "0064");
    radixTen.put("j", "0640");
    radixTen.put("k", "06464");
    radixTen.put("l", "6400");
    radixTen.put("m", "64064");
    radixTen.put("n", "64640");
    radixTen.put("o", "646464");

    radixTen.put("p", "00128");
    radixTen.put("q", "01280");
    radixTen.put("r", "0128128");
    radixTen.put("s", "12800");
    radixTen.put("t", "1280128");
    radixTen.put("u", "1281280");
    radixTen.put("v", "128128128");

    radixTen.put("w", "00256");
    radixTen.put("x", "02560");
    radixTen.put("y", "0256256");
    radixTen.put("z", "25600");
    radixTen.put("!", "2560256");
    radixTen.put('"', "2562560");
    radixTen.put("#", "256256256");

    radixTen.put("$", "00512");
    radixTen.put("%", "05120");
    radixTen.put("&", "0512512");
    radixTen.put("'", "51200");
    radixTen.put("(", "5120512");
    radixTen.put(")", "5125120");
    radixTen.put("*", "512512512");

    radixTen.put("+", "001024");
    radixTen.put(",", "010240");
    radixTen.put("-", "010241024");
    radixTen.put(".", "102400");
    radixTen.put("/", "102401024");
    radixTen.put(":", "102410240");
    radixTen.put(";", "102410241024");

    radixTen.put("<", "002048");
    radixTen.put("=", "020480");
    radixTen.put(">", "020482048");
    radixTen.put("?", "204800");
    radixTen.put("@", "204802048");
    radixTen.put("[", "204820480");
    radixTen.put("\\", "204820482048");

    radixTen.put("]", "004096");
    radixTen.put("^", "040960");
    radixTen.put("_", "040964096");
    radixTen.put("`", "409600");
    radixTen.put("{", "409604096");
    radixTen.put("|", "409640960");
    radixTen.put("}", "409640964096");

    radixTen.put("~", "008192");
    radixTen.put(" ", "081920");

    radixSixteen.put("0", Number.parseInt("000", 16));

    radixSixteen.put("1", Number.parseInt("001", 16));
    radixSixteen.put("2", Number.parseInt("010", 16));
    radixSixteen.put("3", Number.parseInt("011", 16));
    radixSixteen.put("4", Number.parseInt("100", 16));
    radixSixteen.put("5", Number.parseInt("101", 16));
    radixSixteen.put("6", Number.parseInt("110", 16));
    radixSixteen.put("7", Number.parseInt("111", 16));

    radixSixteen.put("8", Number.parseInt("002", 16));
    radixSixteen.put("9", Number.parseInt("020", 16));
    radixSixteen.put("A", Number.parseInt("022", 16));
    radixSixteen.put("B", Number.parseInt("200", 16));
    radixSixteen.put("C", Number.parseInt("202", 16));
    radixSixteen.put("D", Number.parseInt("220", 16));
    radixSixteen.put("E", Number.parseInt("222", 16));

    radixSixteen.put("F", Number.parseInt("004", 16));
    radixSixteen.put("G", Number.parseInt("040", 16));
    radixSixteen.put("H", Number.parseInt("044", 16));
    radixSixteen.put("I", Number.parseInt("400", 16));
    radixSixteen.put("J", Number.parseInt("404", 16));
    radixSixteen.put("K", Number.parseInt("440", 16));
    radixSixteen.put("L", Number.parseInt("444", 16));

    radixSixteen.put("N", Number.parseInt("008", 16));
    radixSixteen.put("O", Number.parseInt("080", 16));
    radixSixteen.put("P", Number.parseInt("088", 16));
    radixSixteen.put("Q", Number.parseInt("800", 16));
    radixSixteen.put("R", Number.parseInt("808", 16));
    radixSixteen.put("S", Number.parseInt("880", 16));
    radixSixteen.put("T", Number.parseInt("888", 16));

    radixSixteen.put("U", Number.parseInt("0016", 16));
    radixSixteen.put("V", Number.parseInt("0160", 16));
    radixSixteen.put("W", Number.parseInt("01616", 16));
    radixSixteen.put("X", Number.parseInt("1600", 16));
    radixSixteen.put("Y", Number.parseInt("16016", 16));
    radixSixteen.put("Z", Number.parseInt("16160", 16));
    radixSixteen.put("a", Number.parseInt("161616", 16));

    radixSixteen.put("b", Number.parseInt("0032", 16));
    radixSixteen.put("c", Number.parseInt("0320", 16));
    radixSixteen.put("d", Number.parseInt("03232", 16));
    radixSixteen.put("e", Number.parseInt("3200", 16));
    radixSixteen.put("f", Number.parseInt("32032", 16));
    radixSixteen.put("g", Number.parseInt("32320", 16));
    radixSixteen.put("h", Number.parseInt("323232", 16));

    radixSixteen.put("i", Number.parseInt("0064", 16));
    radixSixteen.put("j", Number.parseInt("0640", 16));
    radixSixteen.put("k", Number.parseInt("06464", 16));
    radixSixteen.put("l", Number.parseInt("6400", 16));
    radixSixteen.put("m", Number.parseInt("64064", 16));
    radixSixteen.put("n", Number.parseInt("64640", 16));
    radixSixteen.put("o", Number.parseInt("646464", 16));

    radixSixteen.put("p", Number.parseInt("00128", 16));
    radixSixteen.put("q", Number.parseInt("01280", 16));
    radixSixteen.put("r", Number.parseInt("0128128", 16));
    radixSixteen.put("s", Number.parseInt("12800", 16));
    radixSixteen.put("t", Number.parseInt("1280128", 16));
    radixSixteen.put("u", Number.parseInt("1281280", 16));
    radixSixteen.put("v", Number.parseInt("128128128", 16));

    radixSixteen.put("w", Number.parseInt("00256", 16));
    radixSixteen.put("x", Number.parseInt("02560", 16));
    radixSixteen.put("y", Number.parseInt("0256256", 16));
    radixSixteen.put("z", Number.parseInt("25600", 16));
    radixSixteen.put("!", Number.parseInt("2560256", 16));
    radixSixteen.put('"', Number.parseInt("2562560", 16));
    radixSixteen.put("#", Number.parseInt("256256256", 16));

    radixSixteen.put("$", Number.parseInt("00512", 16));
    radixSixteen.put("%", Number.parseInt("05120", 16));
    radixSixteen.put("&", Number.parseInt("0512512", 16));
    radixSixteen.put("'", Number.parseInt("51200", 16));
    radixSixteen.put("(", Number.parseInt("5120512", 16));
    radixSixteen.put(")", Number.parseInt("5125120", 16));
    radixSixteen.put("*", Number.parseInt("512512512", 16));

    radixSixteen.put("+", Number.parseInt("001024", 16));
    radixSixteen.put(",", Number.parseInt("010240", 16));
    radixSixteen.put("-", Number.parseInt("010241024", 16));
    radixSixteen.put(".", Number.parseInt("102400", 16));
    radixSixteen.put("/", Number.parseInt("102401024", 16));
    radixSixteen.put(":", Number.parseInt("102410240", 16));
    radixSixteen.put(";", Number.parseInt("102410241024", 16));

    radixSixteen.put("<", Number.parseInt("002048", 16));
    radixSixteen.put("=", Number.parseInt("020480", 16));
    radixSixteen.put(">", Number.parseInt("020482048", 16));
    radixSixteen.put("?", Number.parseInt("204800", 16));
    radixSixteen.put("@", Number.parseInt("204802048", 16));
    radixSixteen.put("[", Number.parseInt("204820480", 16));
    radixSixteen.put("\\", Number.parseInt("204820482048", 16));

    radixSixteen.put("]", Number.parseInt("004096", 16));
    radixSixteen.put("^", Number.parseInt("040960", 16));
    radixSixteen.put("_", Number.parseInt("040964096", 16));
    radixSixteen.put("`", Number.parseInt("409600", 16));
    radixSixteen.put("{", Number.parseInt("409604096", 16));
    radixSixteen.put("|", Number.parseInt("409640960", 16));
    radixSixteen.put("}", Number.parseInt("409640964096", 16));

    radixSixteen.put("~", Number.parseInt("008192", 16));
    radixSixteen.put(" ", Number.parseInt("081920", 16));
});

function encode()
{
    let input = getInput();
    const key = getKey();

    const buffer = [];

    const ten = radixTen.getEncoder;
    const sixteen = radixSixteen.getEncoder;

    if (input)
    {
        if (key && key !== "")
        {
            console.log(`Key: ${key}\nInput: ${input}`);
            input = CryptoJS.AES.encrypt(input, key).toString();
            console.log(`Encryption Key: ${input}`);
        }

        if (codec === CodecType.SIXTEEN)
        {
            for (let i = 0; i < input.length; i++)
            {
                let char = input.charAt(i);
                const encodedChar = sixteen.get(char);

                buffer.push(unsafeCast(encodedChar == null ? char : encodedChar));
            }
        } else
        {
            for (let i = 0; i < input.length; i++)
            {
                let char = input.charAt(i);
                const encodedChar = ten.get(char);

                buffer.push(unsafeCast(encodedChar == null ? char : encodedChar));
            }
        }

        setOutput(buffer.join(" "));
    }
}

function decode()
{
    const input = getInput();
    const key = getKey();

    const buffer = [];

    const ten = radixTen.getDecoder;
    const sixteen = radixSixteen.getDecoder;

    if (input)
    {
        const pieces = input.split(/\s/g);

        pieces.forEach(piece =>
        {
            let decodedPiece;

            if (codec === CodecType.SIXTEEN)
            {
                decodedPiece = sixteen.get(Number.parseInt(piece));
            } else
            {
                decodedPiece = ten.get(piece);
            }

            buffer.push(unsafeCast(decodedPiece == null ? piece : decodedPiece));
        });

        let output = buffer.join("");

        if (key && key !== "")
        {
            output = CryptoJS.AES.decrypt(output, key).toString(CryptoJS.enc.Utf8);
        }

        setOutput(output);
    }
}

function copyOutput()
{
    const output = document.getElementById("out");
    const outputText = output.value;

    const copy = document.getElementById("copy");

    if (outputText != null && outputText.length !== 0)
    {
        navigator.clipboard.writeText(outputText);
        copy.textContent = "Copied";
    }

    setTimeout(() =>
    {
        copy.textContent = "Copy";
    }, 2000);
}

function loadFile()
{
    const fileElement = document.getElementById("file");
    const files = fileElement.files;
    const file = files[0];

    const reader = new FileReader();

    if (file)
    {
        reader.onload = event =>
        {
            const result = event.target.result;
            setInput(result);
            upload.textContent = "Success";
            fileElement.value = "";
        };
        reader.readAsText(file, "utf-8");
    }

    setTimeout(() =>
    {
        upload.textContent = "Load";
        upload.setAttribute("disabled", "");
    }, 2000);
}

function downloadOutput()
{
    const output = document.getElementById("out").value;
    const link = document.createElement("a");

    link.setAttribute("download", "output.txt");
    link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(output));
    link.click();
}

function clearFields()
{
    setInput(null);
    setOutput(null);
}

function unsafeCast(obj)
{
    return obj;
}

function setRadixTen()
{
    finalizeType(codec = CodecType.TEN);

    if (getClassList("sixteen").contains("active"))
    {
        getClassList("sixteen").remove("active");
    }

    getClassList("ten").add("active");
}

function setRadixSixteen()
{
    finalizeType(codec = CodecType.SIXTEEN);

    if (getClassList("ten").contains("active"))
    {
        getClassList("ten").remove("active");
    }

    getClassList("sixteen").add("active");
}

function finalizeType(codecType)
{
    const tenOption = document.getElementById('ten');
    const sixteenOption = document.getElementById('sixteen');

    if (codecType !== CodecType.UNSET)
    {
        encrypt.removeAttribute("disabled");
        decrypt.removeAttribute("disabled");
    }

    switch (codecType)
    {
        case CodecType.UNSET:
        {
            break;
        }
        case CodecType.TEN:
        {
            if (sixteenOption.hasAttribute('checked')) {
                sixteenOption.removeAttribute('checked');
            }

            tenOption.setAttribute('checked', '');
            
            break;
        }
        case CodecType.SIXTEEN:
        {
            if (tenOption.hasAttribute('checked')) {
                tenOption.removeAttribute('checked');
            }

            sixteenOption.setAttribute('checked', '');

            break;
        }
        default:
        {
            console.error(`Invalid CodecType: ${codecType}`);
            break;
        }
    }
}

function getClassList(name)
{
    return document.getElementById(name)?.classList;
}

function setInput(obj)
{
    document.getElementById("in").value = obj;
}

function setOutput(obj)
{
    if (obj && obj !== "")
    {
        copy.removeAttribute("disabled");
        download.removeAttribute("disabled");
        clear.removeAttribute("disabled");
    }

    if (!obj)
    {
        copy.setAttribute("disabled", "");
        download.setAttribute("disabled", "");
        clear.setAttribute("disabled", "");
    }

    document.getElementById("out").value = obj;
}

function setKey(obj)
{
    document.getElementById("key").value = obj;
}

function getInput()
{
    return document.getElementById("in").value;
}

function getOutput()
{
    return document.getElementById("out").value;
}

function getKey()
{
    return document.getElementById("key").value;
}
