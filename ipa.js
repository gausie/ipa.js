/* ipa.js by gausie
 * More information available on github.com/gausie/ipa.js
 * For information, email ipa.js@gaus.ie or tweet @gausie
 * /

/*jslint sloppy: true, white: true, safe: false, adsafe: false */

function ipa(ipa_input) {
  
  var ret = [],
      dictionary = {
        '\u0283': 'S', 
        'o\u028a': 'oU', 
        ' ': ' ', 
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
      },
      ends = {
        "[i|U]@r": ["", 1 ],
        "[^e]@r": [ "3", 2 ],
        "[A|O]:r": [ "@" , 2 ],
        "rr" : "r",
        "3:r": "3:"
      },
      i;
  
  function convert(ipa){

    var ret = [],
        i, character, end, re, endlen, rep;
    
    while(ipa){
      for(i=2;i>=0;i-=1){
        if(!i){
          ipa = ipa.substring(1);
        }else if(dictionary.hasOwnProperty(ipa.substring(0,i))){
          character = dictionary[ipa.substring(0,i)];
          if(character){
            character = character.split(" ");
            ret.push(character[0]);
            ret.concat(ipa.substring(i).split(""));
          }
          ipa = ipa.substring(i);
          break;
        }
      }
    }
    
    if(ret[ret.length-1]==="%"){
      ret.splice(0,ret.length-2);
    }
    
    ret = ret.join("");
    
    ret = ret.replace("k'a2n","k'@n").replace("ka2n","k@n").replace("gg","g").replace("@U","oU");
    
    for(end in ends){
      if(ends.hasOwnProperty(end)){
        re = new RegExp(end + "$");
        if(ret.match(re)){
          rep = ends[end];
          if(typeof rep === "object"){
            endlen = rep[1];
            rep = rep[0];
          }else{
            endlen = end.length;
          }
          ret = ret.substring(0,ret.length-endlen) + rep;
          break;
        }
      }
    }
    
    return "[[" + ret + "]]";
    
  }
  
  ipa_input = ipa_input.split(" ");
  
  for(i=0;i<ipa_input.length;i+=1){
    ret.push(convert(ipa_input[i]));
  }
  
  return ret.join(" ");
  
}
