class Serializer<K, V> {
  private encoder: Map<K, V>;
  private decoder: Map<V, K>;

  public constructor() {
    this.encoder = new Map<K, V>();
    this.decoder = new Map<V, K>();
  }

  public put(key: K, value: V) {
    this.encoder.set(key, value);
    this.decoder.set(value, key);
  }

  public get getEncoder(): Map<K, V> {
    return this.encoder;
  }

  public get getDecoder(): Map<V, K> {
    return this.decoder;
  }
}

enum CodecType {
  SX10,
  SX16,
}

var codec: CodecType;

const serializer10 = new Serializer<string, string>();
const serializer16 = new Serializer<string, Number>();

window.addEventListener("load", () => {
  setSx10();

  /**
   * ===========================================
   *                  Sx10
   * ===========================================
   **/

  serializer10.put("0", "000");

  // 1 start

  serializer10.put("1", "001");
  serializer10.put("2", "010");
  serializer10.put("3", "011");

  serializer10.put("4", "100");
  serializer10.put("5", "101");
  serializer10.put("6", "110");

  serializer10.put("7", "111");

  // 2 start

  serializer10.put("8", "002");
  serializer10.put("9", "020");
  serializer10.put("A", "022");

  serializer10.put("B", "200");
  serializer10.put("C", "202");
  serializer10.put("D", "220");

  serializer10.put("E", "222");

  // 4 start

  serializer10.put("F", "004");
  serializer10.put("G", "040");
  serializer10.put("H", "044");

  serializer10.put("I", "400");
  serializer10.put("J", "404");
  serializer10.put("K", "440");

  serializer10.put("L", "444");

  // 8 start

  serializer10.put("N", "008");
  serializer10.put("O", "080");
  serializer10.put("P", "088");

  serializer10.put("Q", "800");
  serializer10.put("R", "808");
  serializer10.put("S", "880");

  serializer10.put("T", "888");

  // 16 start

  serializer10.put("U", "0016");
  serializer10.put("V", "0160");
  serializer10.put("W", "01616");

  serializer10.put("X", "1600");
  serializer10.put("Y", "16016");
  serializer10.put("Z", "16160");

  serializer10.put("a", "161616");

  // 32 start

  serializer10.put("b", "0032");
  serializer10.put("c", "0320");
  serializer10.put("d", "03232");

  serializer10.put("e", "3200");
  serializer10.put("f", "32032");
  serializer10.put("g", "32320");

  serializer10.put("h", "323232");

  // 64 start

  serializer10.put("i", "0064");
  serializer10.put("j", "0640");
  serializer10.put("k", "06464");

  serializer10.put("l", "6400");
  serializer10.put("m", "64064");
  serializer10.put("n", "64640");

  serializer10.put("o", "646464");

  // 128 start

  serializer10.put("p", "00128");
  serializer10.put("q", "01280");
  serializer10.put("r", "0128128");

  serializer10.put("s", "12800");
  serializer10.put("t", "1280128");
  serializer10.put("u", "1281280");

  serializer10.put("v", "128128128");

  // 256 start

  serializer10.put("w", "00256");
  serializer10.put("x", "02560");
  serializer10.put("y", "0256256");

  serializer10.put("z", "25600");
  serializer10.put("!", "2560256");
  serializer10.put('"', "2562560");

  serializer10.put("#", "256256256");

  // 512 start

  serializer10.put("$", "00512");
  serializer10.put("%", "05120");
  serializer10.put("&", "0512512");

  serializer10.put("'", "51200");
  serializer10.put("(", "5120512");
  serializer10.put(")", "5125120");

  serializer10.put("*", "512512512");

  // 1024 start

  serializer10.put("+", "001024");
  serializer10.put(",", "010240");
  serializer10.put("-", "010241024");

  serializer10.put(".", "102400");
  serializer10.put("/", "102401024");
  serializer10.put(":", "102410240");

  serializer10.put(";", "102410241024");

  // 2048 start

  serializer10.put("<", "002048");
  serializer10.put("=", "020480");
  serializer10.put(">", "020482048");

  serializer10.put("?", "204800");
  serializer10.put("@", "204802048");
  serializer10.put("[", "204820480");

  serializer10.put("\\", "204820482048");

  // 4096 start

  serializer10.put("]", "004096");
  serializer10.put("^", "040960");
  serializer10.put("_", "040964096");

  serializer10.put("`", "409600");
  serializer10.put("{", "409604096");
  serializer10.put("|", "409640960");

  serializer10.put("}", "409640964096");

  // 8192 start

  serializer10.put("~", "008192");
  serializer10.put(" ", "081920");

  /**
   * ===========================================
   *                  Sx16
   * ===========================================
   **/

  serializer16.put("0", Number.parseInt("000", 16));

  // 1 start

  serializer16.put("1", Number.parseInt("001", 16));
  serializer16.put("2", Number.parseInt("010", 16));
  serializer16.put("3", Number.parseInt("011", 16));

  serializer16.put("4", Number.parseInt("100", 16));
  serializer16.put("5", Number.parseInt("101", 16));
  serializer16.put("6", Number.parseInt("110", 16));

  serializer16.put("7", Number.parseInt("111", 16));

  // 2 start

  serializer16.put("8", Number.parseInt("002", 16));
  serializer16.put("9", Number.parseInt("020", 16));
  serializer16.put("A", Number.parseInt("022", 16));

  serializer16.put("B", Number.parseInt("200", 16));
  serializer16.put("C", Number.parseInt("202", 16));
  serializer16.put("D", Number.parseInt("220", 16));

  serializer16.put("E", Number.parseInt("222", 16));

  // 4 start

  serializer16.put("F", Number.parseInt("004", 16));
  serializer16.put("G", Number.parseInt("040", 16));
  serializer16.put("H", Number.parseInt("044", 16));

  serializer16.put("I", Number.parseInt("400", 16));
  serializer16.put("J", Number.parseInt("404", 16));
  serializer16.put("K", Number.parseInt("440", 16));

  serializer16.put("L", Number.parseInt("444", 16));

  // 8 start

  serializer16.put("N", Number.parseInt("008", 16));
  serializer16.put("O", Number.parseInt("080", 16));
  serializer16.put("P", Number.parseInt("088", 16));

  serializer16.put("Q", Number.parseInt("800", 16));
  serializer16.put("R", Number.parseInt("808", 16));
  serializer16.put("S", Number.parseInt("880", 16));

  serializer16.put("T", Number.parseInt("888", 16));

  // 16 start

  serializer16.put("U", Number.parseInt("0016", 16));
  serializer16.put("V", Number.parseInt("0160", 16));
  serializer16.put("W", Number.parseInt("01616", 16));

  serializer16.put("X", Number.parseInt("1600", 16));
  serializer16.put("Y", Number.parseInt("16016", 16));
  serializer16.put("Z", Number.parseInt("16160", 16));

  serializer16.put("a", Number.parseInt("161616", 16));

  // 32 start

  serializer16.put("b", Number.parseInt("0032", 16));
  serializer16.put("c", Number.parseInt("0320", 16));
  serializer16.put("d", Number.parseInt("03232", 16));

  serializer16.put("e", Number.parseInt("3200", 16));
  serializer16.put("f", Number.parseInt("32032", 16));
  serializer16.put("g", Number.parseInt("32320", 16));

  serializer16.put("h", Number.parseInt("323232", 16));

  // 64 start

  serializer16.put("i", Number.parseInt("0064", 16));
  serializer16.put("j", Number.parseInt("0640", 16));
  serializer16.put("k", Number.parseInt("06464", 16));

  serializer16.put("l", Number.parseInt("6400", 16));
  serializer16.put("m", Number.parseInt("64064", 16));
  serializer16.put("n", Number.parseInt("64640", 16));

  serializer16.put("o", Number.parseInt("646464", 16));

  // 128 start

  serializer16.put("p", Number.parseInt("00128", 16));
  serializer16.put("q", Number.parseInt("01280", 16));
  serializer16.put("r", Number.parseInt("0128128", 16));

  serializer16.put("s", Number.parseInt("12800", 16));
  serializer16.put("t", Number.parseInt("1280128", 16));
  serializer16.put("u", Number.parseInt("1281280", 16));

  serializer16.put("v", Number.parseInt("128128128", 16));

  // 256 start

  serializer16.put("w", Number.parseInt("00256", 16));
  serializer16.put("x", Number.parseInt("02560", 16));
  serializer16.put("y", Number.parseInt("0256256", 16));

  serializer16.put("z", Number.parseInt("25600", 16));
  serializer16.put("!", Number.parseInt("2560256", 16));
  serializer16.put('"', Number.parseInt("2562560", 16));

  serializer16.put("#", Number.parseInt("256256256", 16));

  // 512 start

  serializer16.put("$", Number.parseInt("00512", 16));
  serializer16.put("%", Number.parseInt("05120", 16));
  serializer16.put("&", Number.parseInt("0512512", 16));

  serializer16.put("'", Number.parseInt("51200", 16));
  serializer16.put("(", Number.parseInt("5120512", 16));
  serializer16.put(")", Number.parseInt("5125120", 16));

  serializer16.put("*", Number.parseInt("512512512", 16));

  // 1024 start

  serializer16.put("+", Number.parseInt("001024", 16));
  serializer16.put(",", Number.parseInt("010240", 16));
  serializer16.put("-", Number.parseInt("010241024", 16));

  serializer16.put(".", Number.parseInt("102400", 16));
  serializer16.put("/", Number.parseInt("102401024", 16));
  serializer16.put(":", Number.parseInt("102410240", 16));

  serializer16.put(";", Number.parseInt("102410241024", 16));

  // 2048 start

  serializer16.put("<", Number.parseInt("002048", 16));
  serializer16.put("=", Number.parseInt("020480", 16));
  serializer16.put(">", Number.parseInt("020482048", 16));

  serializer16.put("?", Number.parseInt("204800", 16));
  serializer16.put("@", Number.parseInt("204802048", 16));
  serializer16.put("[", Number.parseInt("204820480", 16));

  serializer16.put("\\", Number.parseInt("204820482048", 16));

  // 4096 start

  serializer16.put("]", Number.parseInt("004096", 16));
  serializer16.put("^", Number.parseInt("040960", 16));
  serializer16.put("_", Number.parseInt("040964096", 16));

  serializer16.put("`", Number.parseInt("409600", 16));
  serializer16.put("{", Number.parseInt("409604096", 16));
  serializer16.put("|", Number.parseInt("409640960", 16));

  serializer16.put("}", Number.parseInt("409640964096", 16));

  // 8192 start

  serializer16.put("~", Number.parseInt("008192", 16));
  serializer16.put(" ", Number.parseInt("081920", 16));
});

function encode() {
  var input = getInput();
  var buffer = [];

  var encoder10 = serializer10.getEncoder;
  var encoder16 = serializer16.getEncoder;

  if (input != null) {
    if (codec == CodecType.SX16) {
      for (var i = 0; i < input.length; i++) {
        var char = input.charAt(i);
        var encodedChar = encoder16.get(char);

        buffer.push(unsafeCast(encodedChar == null ? char : encodedChar));
      }
    } else {
      for (var i = 0; i < input.length; i++) {
        var char = input.charAt(i);
        let encodedChar = encoder10.get(char);

        buffer.push(unsafeCast(encodedChar == null ? char : encodedChar));
      }
    }

    setOutput(buffer.join(" "));
  }
}

function decode() {
  var input = getInput();
  var buffer = [];

  var decoder10 = serializer10.getDecoder;
  var decoder16 = serializer16.getDecoder;

  if (input != null) {
    var pieces = input.split(/\s/g);

    pieces.forEach((piece) => {
      var decodedPiece: any;

      if (codec == CodecType.SX16) {
        decodedPiece = decoder16.get(Number.parseInt(piece));
      } else {
        decodedPiece = decoder10.get(piece);
      }

      buffer.push(unsafeCast(decodedPiece == null ? piece : decodedPiece));
    });

    setOutput(buffer.join(""));
  }
}

function clearFlds() {
  setInput(null);
  setOutput(null);
}

function unsafeCast(obj: any): never {
  return <never>obj;
}

function setSx10() {
  codec = CodecType.SX10;

  if (getClassList("Sx16").contains("active")) {
    getClassList("Sx16").remove("active");
  }

  getClassList("Sx10").add("active");

  console.log(`CodecType has been set to: ${CodecType[codec]}`);
}

function setSx16() {
  codec = CodecType.SX16;

  if (getClassList("Sx10").contains("active")) {
    getClassList("Sx10").remove("active");
  }

  getClassList("Sx16").add("active");

  console.log(`CodecType has been set to: ${CodecType[codec]}`);
}

function getClassList(name: string): DOMTokenList {
  return <DOMTokenList>document.getElementById(name)?.classList;
}

function setInput(obj: any) {
  (<HTMLInputElement>document.getElementById("in")).value = obj;
}

function setOutput(obj: any) {
  (<HTMLInputElement>document.getElementById("out")).value = obj;
}

function setKey(obj: any) {
  (<HTMLInputElement>document.getElementById("key")).value = obj;
}

function getInput() {
  return (<HTMLInputElement>document.getElementById("in")).value;
}

function getOutput() {
  return (<HTMLInputElement>document.getElementById("out")).value;
}

function getKey() {
  return (<HTMLInputElement>document.getElementById("key")).value;
}
