const extractSection = (pattern, text) => {
    const match = text.match(pattern);
    return match ? match[1].trim() : "";
}

const convertDifficulty = (difficulty) => {
    switch (difficulty) {
        case 1:
        case 7:
        case 8:
            difficulty = "Easy";
            break;
        case 2:
        case 10:
        case 11:
        case 12:
            difficulty = "Medium";
            break;
        case 3:
        case 6:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            difficulty = "Hard";
            break;
        default:
            difficulty = "Unknown";
            break;
    }

    return difficulty;
}

const convertSource = (source) => {
    switch (source) {
        case 1:
            source = "CodeChef";
            break;
        case 2:
            source = "CodeForces"
            break;
        case 3:
            source = "HackerEarth";
            break;
        case 5:
            source = "ATCoder";
            break;
        case 6:
            source = "Aizu";
            break;
        default:
            source = "Unknown";
            break;
    }
    return source;
}

export default function extractCode(problem) {
    let name, source, difficulty, timeLimit, memoryLimit, description, statement, input, output, constraints, example, explanation;
    let statementPattern, constraintsPattern, inputPattern, outputPattern, examplesPattern, explainPattern;

    name = problem.name;
    source = convertSource(problem.source);
    difficulty = convertDifficulty(problem.difficulty);
    description = problem.description;
    timeLimit = `${problem.second}.${problem.nano} sec`
    memoryLimit = `${problem.memory_limit_bytes * 0.000001} MB`

    if (problem.source === 1) {
        statementPattern = /([\w\W]*?)\nInput/;
        inputPattern = /Input\n+([\w\W]*?)Output/;
        outputPattern = /Output\n+([\w\W]*?)Example/;
        examplesPattern = /Examples?\n+([\w\W]*?)(?:\nConstraints|$)/;
        constraintsPattern = /Constraints\n+([\w\W]*?)(?:\nExplanation|$)/;
        explainPattern = /Explanation\n+([\w\W]*?)$/;

    } else if (problem.source === 2) {
        statementPattern = /([\w\W]*?)\nInput/;
        inputPattern = /Input\n+([\w\W]*?)Output/;
        outputPattern = /Output\n+([\w\W]*?)Example/;
        constraintsPattern = /Constraints\n+([\w\W]*?)Examples?/;
        examplesPattern = /Examples?\n+([\w\W]*?)(?:\nNote|$)/;
        explainPattern = /Note\n+([\w\W]*?)$/;
    } else if (problem.source === 3) {
        statementPattern = /([\w\W]*?)\nInput:?/;
        inputPattern = /Input:?\n+([\w\W]*?)Output:?/;
        outputPattern = /Output:?\n+([\w\W]*?)Constraints/;
        constraintsPattern = /Constraints\n+([\w\W]*?)SAMPLE INPUT/;
        examplesPattern = /SAMPLE INPUT?\n+([\w\W]*?)(?:\nExplanation|$)/;
        explainPattern = /Explanation\n+([\w\W]*?)$/;
    } else if (problem.source === 5) {
        statementPattern = /([\w\W]*?)\nConstraints/;
        constraintsPattern = /Constraints\n+([\w\W]*?)\nInputs?/;
        inputPattern = /Inputs?\n+([\w\W]*?)\nOutputs?/;
        outputPattern = /Outputs?\n+([\w\W]*?)\nExamples?/;
        examplesPattern = /Examples?\n+([\w\W]*?)(?:\nExplanation|$)/;
    } else if (problem.source === 6) {
        statementPattern = /([\w\W]*?)\nConstraints/;
        constraintsPattern = /Constraints\n+([\w\W]*?)\nInputs?/;
        inputPattern = /Inputs?\n+([\w\W]*?)\nOutputs?/;
        outputPattern = /Outputs?\n+([\w\W]*?)\nExamples?/;
        examplesPattern = /Examples?\n+([\w\W]*?)(?:\nExplanation|$)/;
    }

    statement = extractSection(statementPattern, description);
    constraints = extractSection(constraintsPattern, description);
    input = extractSection(inputPattern, description);
    output = extractSection(outputPattern, description);
    example = extractSection(examplesPattern, description);
    explanation = extractSection(explainPattern, description);


    return {
        name,
        source,
        difficulty,
        timeLimit,
        memoryLimit,
        statement,
        input,
        output,
        constraints,
        example,
        explanation
    }
}