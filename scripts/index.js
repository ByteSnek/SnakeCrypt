import { setDarkTheme, setNavbar } from "./api.js";
import { SnakeCryptCodec } from "./snakecrypt.js";
const CODEC = new SnakeCryptCodec();
addEventListener('keydown', () => window.onKeyPress());
initialize();
function initialize() {
    setNavbar('SnakeCrypt', 'neue-xt');
    setDarkTheme();
}
window.onKeyPress = function onKeyPress() {
    const input = document.getElementById('input');
    const encrypt = document.getElementById('encrypt');
    const decrypt = document.getElementById('decrypt');
    encrypt.disabled = input.textLength === 0;
    decrypt.disabled = input.textLength === 0;
};
window.encryptInput = function encryptInput() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const inputText = input.value;
    output.value = CODEC.encode(inputText);
    utilButtons(true);
};
window.decryptInput = function decryptInput() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const inputText = input.value;
    output.value = CODEC.decode(inputText);
    utilButtons(true);
};
window.copyOutput = function copyOutput() {
    const copy = document.getElementById('copy');
    const output = document.getElementById('output');
    const outputText = output.value;
    navigator.clipboard.writeText(outputText);
    copy.textContent = 'Copied';
    function resetCopyText() {
        copy.textContent = 'Copy';
    }
    setTimeout(resetCopyText, 2000);
};
window.downloadOutput = function downloadOutput() {
    const output = document.getElementById('output');
    const outputText = output.value;
    const parts = [outputText];
    const options = { type: 'text/plain' };
    const blob = new Blob(parts, options);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'output.txt';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
};
window.clearFields = function clearFields() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    input.value = '';
    output.value = '';
    codecButtons(false);
    utilButtons(false);
};
function codecButtons(enable) {
    const encrypt = document.getElementById('encrypt');
    const decrypt = document.getElementById('decrypt');
    encrypt.disabled = !enable;
    decrypt.disabled = !enable;
}
function utilButtons(enable) {
    const copy = document.getElementById('copy');
    const download = document.getElementById('download');
    const clear = document.getElementById('clear');
    copy.disabled = !enable;
    download.disabled = !enable;
    clear.disabled = !enable;
}
