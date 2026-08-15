export class SnakeCryptCodec {
    constructor(encoderMap, decoderMap) {
        this.encoderMap = encoderMap ? encoderMap : new Map();
        this.decoderMap = decoderMap ? decoderMap : new Map();
        this.initialize();
    }
    initialize() {
        const charset = this.getCharset();
        let base = 1;
        for (let i = 0; i < charset.length; i++) {
            const character = charset[i];
            const value = base.toString();
            const position = i % 7;
            let encoded = '';
            switch (position) {
                case 0: {
                    encoded = value.padStart(3, '0');
                    break;
                }
                case 1: {
                    encoded = `${value}0`;
                    break;
                }
                case 2: {
                    encoded = `${value}${value}`;
                    break;
                }
                case 3: {
                    encoded = `0${value}0`;
                    break;
                }
                case 4: {
                    encoded = `${value}0${value}`;
                    break;
                }
                case 5: {
                    encoded = `${value}${value}0`;
                    break;
                }
                case 6: {
                    encoded = `${value}${value}${value}`;
                    base *= 2;
                    break;
                }
            }
            this.put(character, encoded);
        }
    }
    put(key, value) {
        this.getEncoderMap().set(key, value);
        this.getDecoderMap().set(value, key);
    }
    encode(text) {
        const buffer = [];
        for (let i = 0; i < text.length; i++) {
            const character = text.charAt(i);
            const encodedChar = this.getEncoderMap().get(character);
            if (encodedChar) {
                buffer.push(encodedChar.toString());
            }
            else {
                buffer.push(character);
            }
        }
        const encoded = buffer.join(SnakeCryptCodec.SEPARATOR);
        return encoded;
    }
    decode(text) {
        const buffer = [];
        const stripped = text.split(SnakeCryptCodec.SEPARATOR);
        for (let i = 0; i < stripped.length; i++) {
            const chunk = stripped[i];
            const decodedChar = this.getDecoderMap().get(chunk);
            if (decodedChar) {
                buffer.push(decodedChar);
            }
            else {
                buffer.push(chunk);
            }
        }
        return buffer.join('');
    }
    getEncoderMap() {
        return this.encoderMap;
    }
    getDecoderMap() {
        return this.decoderMap;
    }
    getCharset() {
        return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ '.split('');
    }
}
SnakeCryptCodec.SEPARATOR = '//';
