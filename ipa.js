dictionary = {
  '\u0283': 'S', 
  'o\u028a': 'oU', 
  ' ': '', 
  '\u02a7': 'tS', 
  ',': '', 
  'e\u02d0': 'e@', 
  '@': '@', 
  'd\u026b': 'l', 
  '\u0254': '0', 
  'o\u02d0': 'O:', 
  'd': 'd', 
  'h': 'h', 
  'l': 'l', 
  'p': 'p', 
  't': 't', 
  '\u0268': 'I', 
  'x': 'x', 
  '\u026a': 'I', 
  'e\u026a': 'eI', 
  '\u028c': 'V', 
  'a\\u02d0': 'A:', 
  '#': '', 
  '\u02a4': 'dZ', 
  'e\u0259': 'e@', 
  'd\u0292': 'dZ', 
  '?': '', 
  '\u026a\u0279': 'i@', 
  '\u025c\u02d0': '3:', 
  '\u02c8': "'", 
  '\u02cc': ',', 
  '\u02d0': 'A:', 
  '\u025b': 'E', 
  't\u0283': 'tS', 
  '_': '', 
  '\u0251': 'A:', 
  'o\u026a': 'OI', 
  'g': 'g', 
  'k': 'k', 
  'o': 'oU', 
  '\xf0': 'D', 
  's': 's', 
  'w': 'w', 
  '\u025b\u0259': 'e@', 
  '\u028d': 'w', 
  '\u0259\u02d0': '3:', 
  'i\u02d0': 'i:', 
  '\u025b\u0279': 'e@', 
  '\u0254\u02d0': 'O:', 
  '.': '%', 
  '\u0259\u0289': 'oU', 
  'a': 'a', 
  '\u0259\u028a': 'oU', 
  '\u028a\u0259': 'U@', 
  '\u0252': '0', 
  '\xe6\u026a': 'eI', 
  '\u025a': '3', 
  '\u026a\u0259': 'i@', 
  '\u0251\u02d0': 'A:', 
  'b': 'b', 
  '\xe6\u0254': 'aU', 
  '\u028a\u0279': 'U@', 
  'f': 'f', 
  'a\u028a': 'aU', 
  'n': 'n', 
  '\u028a': 'U', 
  'r': 'r', 
  'v': 'v', 
  'z': 'z', 
  '\u027e': 't', 
  '\u025b\u02d0': 'e@', 
  '\u0289\u02d0': 'u:', 
  'a\u026a': 'aI', 
  '\u0292': 'Z', 
  '\u0254\u026a': 'OI', 
  '!': '', 
  '-': '', 
  'j': 'j', 
  '\u03b8': 'T', 
  '\u0251\u0279': 'A:', 
  '\u014b': 'N', 
  'u\u02d0': 'u:', 
  '\u2051': 'A', 
  '\u0251e': 'aI', 
  '\u0259': '@', 
  '\u025d': '3:', 
  '\u0261': 'g', 
  'e': 'E', 
  '\xe6': 'a', 
  'i': 'i:', 
  'm': 'm', 
  'u': 'u:', 
  '\u0279': 'r'
}

consonants = ['b', 'd', 'f', 'g', 'h', 'k', 'l', 'L', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'j', 'z'];

function ipa(ipa){
  //if ((ipa.indexOf("\\u") == -1) || (ipa.indexOf("\"") > -1) ) { ipa = decodeURIComponent(escape(ipa)); }
  ret = []; toAddAfter = null;
  while(ipa){
    for(i=2;i>-1;i--){
      if(!i){ //??
        ipa = ipa.substring(1);
      }else if(dictionary.hasOwnProperty(ipa.substring(0,i))){
        toAdd = dictionary[ipa.substring(0,i)];
        // missing out converting some festival lines. fingers crossed
        if(toAdd){
          toAdd = toAdd.split(" ");
          ret.push(toAdd[0]);
          if(toAddAfter && (consonants.indexOf(toAdd[0]) == -1)){
            ret.push(toAddAfter);
            toAddAfter = null;
          }
          ret.concat(ipa.substring(i).split(""));
        }
        ipa = ipa.substring(i);
        break;
      }
    }
  }
  
  if (toAddAfter){
    ret.push(toAddAfter);
  }
  
  if(ret[ret.length-1]=="%"){
    ret.splice(0,ret.length-2);
  }
  
  ret = ret.join("");
  
  ret = ret.replace("k'a2n","k'@n").replace("ka2n","k@n").replace("gg","g").replace("@U","oU");
  
  if (ret.substring(-3) == "i@r"){ 
    ret = ret.substring(0,-3)+"i@";
  }else if (ret.substring(-3) == "U@r"){ 
    ret = ret.substring(0,-3)+"U@";
  }else if (ret.substring(-2) == "@r" && r.substr(-3,1) != "e"){
    ret = ret.substring(0,-2)+"3";
  }else if(ret.substring(-3) == "A:r"){
    ret = ret.substring(0,-3)+"A@";
  }else if (ret.substring(-3) == "O:r"){
    ret = ret.substring(0,-3)+"O@";
  }else if (ret.substring(-2) == "rr" || ret.substring(-3) == "3:r"){ 
    ret = ret.substring(0,-1);
  }
  
  return "[[" + ret + "]]";
}
