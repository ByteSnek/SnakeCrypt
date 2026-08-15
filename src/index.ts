import { setDarkTheme, setNavbar } from "./api.js";
import { SnakeCryptCodec } from "./snakecrypt.js";

const CODEC: SnakeCryptCodec = new SnakeCryptCodec();

addEventListener('keydown', () => window.onKeyPress());

declare global 
{
    interface Window 
    {
        onKeyPress: () => void;
        encryptInput: () => void;
        decryptInput: () => void;
        copyOutput: () => void;
        downloadOutput: () => void;
        clearFields: () => void;
    }
}

initialize();

function initialize() 
{
    setNavbar('SnakeCrypt', 'neue-xt');
    setDarkTheme();
}

window.onKeyPress = function onKeyPress(): void
{
    const input: HTMLTextAreaElement = document.getElementById('input') as HTMLTextAreaElement;
    const encrypt: HTMLButtonElement = document.getElementById('encrypt') as HTMLButtonElement;
    const decrypt: HTMLButtonElement = document.getElementById('decrypt') as HTMLButtonElement;

    encrypt.disabled = input.textLength === 0;
    decrypt.disabled = input.textLength === 0;
}

window.encryptInput = function encryptInput(): void
{
    const input: HTMLTextAreaElement = document.getElementById('input') as HTMLTextAreaElement;
    const output: HTMLTextAreaElement = document.getElementById('output') as HTMLTextAreaElement;
    const inputText: string = input.value as string;

    output.value = CODEC.encode(inputText);

    utilButtons(true);
}

window.decryptInput = function decryptInput(): void
{
    const input: HTMLTextAreaElement = document.getElementById('input') as HTMLTextAreaElement;
    const output: HTMLTextAreaElement = document.getElementById('output') as HTMLTextAreaElement;
    const inputText: string = input.value as string;

    output.value = CODEC.decode(inputText);

    utilButtons(true);
}

window.copyOutput = function copyOutput(): void
{
    const copy: HTMLButtonElement = document.getElementById('copy') as HTMLButtonElement;
    const output: HTMLTextAreaElement = document.getElementById('output') as HTMLTextAreaElement;
    const outputText: string = output.value as string;

    navigator.clipboard.writeText(outputText);
    copy.textContent = 'Copied';

    function resetCopyText() 
    {
        copy.textContent = 'Copy';
    }

    setTimeout(resetCopyText, 2000);
}

window.downloadOutput = function downloadOutput(): void
{
    const output: HTMLTextAreaElement = document.getElementById('output') as HTMLTextAreaElement;
    const outputText: string = output.value as string;
    const parts: string[] = [outputText];

    const options: BlobPropertyBag = { type: 'text/plain' };
    const blob: Blob = new Blob(parts, options);
    const url: string = URL.createObjectURL(blob);

    const anchor: HTMLAnchorElement = document.createElement('a');

    anchor.href = url;
    anchor.download = 'output.txt';
    anchor.style.display = 'none';

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
}

window.clearFields = function clearFields(): void
{
    const input: HTMLTextAreaElement = document.getElementById('input') as HTMLTextAreaElement;
    const output: HTMLTextAreaElement = document.getElementById('output') as HTMLTextAreaElement;
    
    input.value = '';
    output.value = '';

    codecButtons(false);
    utilButtons(false);
}

function codecButtons(enable: boolean) 
{
    const encrypt: HTMLButtonElement = document.getElementById('encrypt') as HTMLButtonElement;
    const decrypt: HTMLButtonElement = document.getElementById('decrypt') as HTMLButtonElement;

    encrypt.disabled = !enable;
    decrypt.disabled = !enable;
}

function utilButtons(enable: boolean): void
{
    const copy: HTMLButtonElement = document.getElementById('copy') as HTMLButtonElement;
    const download: HTMLButtonElement = document.getElementById('download') as HTMLButtonElement;
    const clear: HTMLButtonElement = document.getElementById('clear') as HTMLButtonElement;

    copy.disabled = !enable;
    download.disabled = !enable;
    clear.disabled = !enable;
}