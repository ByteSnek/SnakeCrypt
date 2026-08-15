export interface SnakeCryptEncoder<T, R> 
{
    encode(type: T): R

    getEncoderMap(): Map<T, R>
}

export interface SnakeCryptDecoder<T, R>
{
    decode(type: T): R

    getDecoderMap(): Map<T, R>
}

export class SnakeCryptCodec implements SnakeCryptEncoder<string, string>, SnakeCryptDecoder<string, string>
{
    public static SEPARATOR: string = '//';

    private encoderMap: Map<string, string>;
    private decoderMap: Map<string, string>;

    public constructor(encoderMap?: Map<string, string>, decoderMap?: Map<string, string>) 
    {
        this.encoderMap = encoderMap ? encoderMap : new Map();
        this.decoderMap = decoderMap ? decoderMap : new Map();
        this.initialize();
    }

    public initialize(): void
    {
        const charset: string[] = this.getCharset();
        let base: number = 1;

        for (let i = 0; i < charset.length; i++) {
            const character: string = charset[i];
            const value: string = base.toString();
            const position: number = i % 7;
            let encoded: string = '';

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

    public put(key: string, value: string): void 
    {
        this.getEncoderMap().set(key, value);
        this.getDecoderMap().set(value, key);
    }

    public encode(text: string): string
    {
        const buffer: string[] = [];

        for (let i = 0; i < text.length; i++) {
            const character: string = text.charAt(i);
            const encodedChar: string | undefined = this.getEncoderMap().get(character);

            if (encodedChar) {
                buffer.push(encodedChar.toString());
            } else {
                buffer.push(character);
            }
        }

        const encoded: string = buffer.join(SnakeCryptCodec.SEPARATOR);

        return encoded;
    }

    public decode(text: string): string
    {
        const buffer: string[] = [];
        const stripped: string[] = text.split(SnakeCryptCodec.SEPARATOR);

        for (let i = 0; i < stripped.length; i++) {
            const chunk: string = stripped[i];
            const decodedChar: string | undefined = this.getDecoderMap().get(chunk);

            if (decodedChar) {
                buffer.push(decodedChar);
            } else {
                buffer.push(chunk);
            }
        }

        return buffer.join('');
    }

    public getEncoderMap(): Map<string, string>
    {
        return this.encoderMap;
    }

    public getDecoderMap(): Map<string, string>
    {
        return this.decoderMap;
    }

    public getCharset(): string[] 
    {
        return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ '.split('');
    }
}