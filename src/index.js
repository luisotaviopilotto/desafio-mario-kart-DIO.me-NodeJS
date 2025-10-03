const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function getRandomItem() {
  let random = Math.random();
  if (random < 0.5) {
    return { tipo: "CASCO", pontos: -1 };
  } else {
    return { tipo: "BOMBA", pontos: -2 };
  }
}

async function hasRandomTurbo() {
  return Math.random() < 0.5;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `🎲 | ${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "RETA",
        diceResult1,
        character1.VELOCIDADE
      );
      await logRollResult(
        character2.NOME,
        "RETA",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "CURVA",
        diceResult1,
        character1.MANOBRABILIDADE
      );
      await logRollResult(
        character2.NOME,
        "CURVA",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`🥊 | ${character1.NOME} confrontou com ${character2.NOME}!`);

      await logRollResult(
        character1.NOME,
        "CONFRONTO",
        diceResult1,
        character1.PODER
      );
      await logRollResult(
        character2.NOME,
        "CONFRONTO",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2) {
        let item = await getRandomItem();
        let pontosPerda = Math.abs(item.pontos);

        if (character2.PONTOS > 0) {
          let pontosAntigos = character2.PONTOS;
          character2.PONTOS = Math.max(0, character2.PONTOS + item.pontos);
          let pontosReaisRemovidos = pontosAntigos - character2.PONTOS;
          console.log(
            `💥 | ${character2.NOME} foi atingido por um ${item.tipo} e perdeu ${pontosReaisRemovidos} ponto(s)!`
          );
        } else {
          console.log(
            `⚠️ | ${character2.NOME} foi atingido por um ${item.tipo}, mas não tem pontos para perder!`
          );
        }

        let ganhouTurbo = await hasRandomTurbo();
        if (ganhouTurbo) {
          character1.PONTOS++;
          console.log(
            `🚀 | ${character1.NOME} ganhou um TURBO e marcou +1 ponto!`
          );
        }

        console.log(`🏆 | ${character1.NOME} venceu o confronto!`);
      } else if (powerResult2 > powerResult1) {
        let item = await getRandomItem();
        let pontosPerda = Math.abs(item.pontos);

        if (character1.PONTOS > 0) {
          let pontosAntigos = character1.PONTOS;
          character1.PONTOS = Math.max(0, character1.PONTOS + item.pontos);
          let pontosReaisRemovidos = pontosAntigos - character1.PONTOS;
          console.log(
            `💥 | ${character1.NOME} foi atingido por um ${item.tipo} e perdeu ${pontosReaisRemovidos} ponto(s)!`
          );
        } else {
          console.log(
            `⚠️ | ${character1.NOME} foi atingido por um ${item.tipo}, mas não tem pontos para perder!`
          );
        }

        let ganhouTurbo = await hasRandomTurbo();
        if (ganhouTurbo) {
          character2.PONTOS++;
          console.log(
            `🚀 | ${character2.NOME} ganhou um TURBO e marcou +1 ponto!`
          );
        }

        console.log(`🏆 | ${character2.NOME} venceu o confronto!`);
      } else if (powerResult1 === powerResult2) {
        console.log("Confronto empatado! Nenhum ponto foi perdido.");
      }
    }

    if (block === "RETA" || block === "CURVA") {
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.NOME} marcou 1 ponto!`);
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.NOME} marcou 1 ponto!`);
        character2.PONTOS++;
      } else {
        console.log("Empate! Ninguém marcou ponto.");
      }
    }

    console.log("-------------------------------------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("-------------------------------------------------------");
  console.log(`🏁 RESULTADO FINAL:`);
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);
  console.log("-------------------------------------------------------");

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`🏆 ${character1.NOME} venceu a corrida! 🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`🏆 ${character2.NOME} venceu a corrida! 🏆`);
  } else {
    console.log(
      `🤝 Corrida entre ${character1.NOME} e ${character2.NOME} empatou!`
    );
  }
  console.log("-------------------------------------------------------");
}

(async function main() {
  console.log(
    `🏁 🚨 | Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
