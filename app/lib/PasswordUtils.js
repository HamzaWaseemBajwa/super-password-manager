const randomFunc = {
  upper: getRandomUpperCase,
  lower: getRandomLowerCase,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

//Generate Password Function
export function generatePassword(
  upper = true,
  lower = true,
  number = true,
  symbol = true,
  length = 16
) {
  let generatedPassword = "";

  const typesCount = upper + lower + number + symbol;

  //console.log(typesCount);

  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Generating random values

function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  var symbol = "!@#$%^&*(){}[]=<>/,.|~?";
  return symbol[Math.floor(Math.random() * symbol.length)];
}

var m_strUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var m_strLowerCase = "abcdefghijklmnopqrstuvwxyz";
var m_strNumber = "0123456789";
var m_strCharacters = "!@#$%^&*?_~";

export function checkPasswordStrength(password) {
  len = password.length;

  var comp;

  if (len == 0) {
    comp = { strength: "", value: null };
  } else {
    scr = parseInt(getPwdScore(password));

    if (scr >= 90) {
      comp = { strength: "Very Strong", value: 1.0, color: "#00FF00" };
    } else if (scr >= 70) {
      comp = { strength: "Strong", value: 0.8, color: "#7FFF00" };
    } else if (scr >= 50) {
      comp = { strength: "Good", value: 0.6, color: "#FFFF00" };
    } else if (scr >= 30) {
      comp = { strength: "Weak", value: 0.4, color: "#FFFF00" };
    } else if (scr >= 0) {
      comp = { strength: "Very Weak", value: 0.2, color: "#FF0000" };
    }
  }
  return comp;
}

function getPwdScore(strPassword) {
  // Reset combination count
  var nScore = 0;

  // Password length
  // -- Less than 4 characters
  if (strPassword.length < 5) {
    nScore += 5;
  }
  // -- 5 to 7 characters
  else if (strPassword.length > 4 && strPassword.length < 8) {
    nScore += 10;
  }
  // -- 8 or more
  else if (strPassword.length > 7) {
    nScore += 25;
  }

  // Letters
  var nUpperCount = countContain(strPassword, m_strUpperCase);
  var nLowerCount = countContain(strPassword, m_strLowerCase);
  var nLowerUpperCount = nUpperCount + nLowerCount;
  // -- Letters are all lower case
  if (nUpperCount == 0 && nLowerCount != 0) {
    nScore += 10;
  }
  // -- Letters are upper case and lower case
  else if (nUpperCount != 0 && nLowerCount != 0) {
    nScore += 20;
  }

  // Numbers
  var nNumberCount = countContain(strPassword, m_strNumber);
  // -- 1 number
  if (nNumberCount == 1) {
    nScore += 10;
  }
  // -- 3 or more numbers
  if (nNumberCount >= 3) {
    nScore += 20;
  }

  // Characters
  var nCharacterCount = countContain(strPassword, m_strCharacters);
  // -- 1 character
  if (nCharacterCount == 1) {
    nScore += 10;
  }
  // -- More than 1 character
  if (nCharacterCount > 1) {
    nScore += 25;
  }

  // Bonus
  // -- Letters and numbers
  if (nNumberCount != 0 && nLowerUpperCount != 0) {
    nScore += 2;
  }
  // -- Letters, numbers, and characters
  if (nNumberCount != 0 && nLowerUpperCount != 0 && nCharacterCount != 0) {
    nScore += 3;
  }
  // -- Mixed case letters, numbers, and characters
  if (
    nNumberCount != 0 &&
    nUpperCount != 0 &&
    nLowerCount != 0 &&
    nCharacterCount != 0
  ) {
    nScore += 5;
  }

  return nScore;
}

// Checks a string for a list of characters
function countContain(strPassword, strCheck) {
  // Declare variables
  var nCount = 0;

  for (i = 0; i < strPassword.length; i++) {
    if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
      nCount++;
    }
  }

  return nCount;
}
