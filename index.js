import axios from 'axios';

async function Fetch() {
    try {
        let response = await axios.get('https://euromillions.api.pedromealha.dev/draws');
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

function freqAnalysis(response) {
    const numbersFreq = new Map();
    const starsFreq = new Map();
    for(let i = 0; i < response.length; i++) {
        const numbers = response[i].numbers;
        const stars = response[i].stars;
        for(let j = 0; j < numbers.length; j++) {
            if(numbersFreq.has(numbers[j])) numbersFreq.set(numbers[j], numbersFreq.get(numbers[j]) + 1);
            else numbersFreq.set(numbers[j], 1);
        }
        for(let k = 0; k < stars.length; k++) {
            if(starsFreq.has(stars[k])) starsFreq.set(stars[k], starsFreq.get(stars[k]) + 1);
            else starsFreq.set(stars[k], 1);
        }
    }
    const numbersFreqSorted = new Map([...numbersFreq.entries()].sort((a, b) => b[1] - a[1]));
    const starsFreqSorted = new Map([...starsFreq.entries()].sort((a, b) => b[1] - a[1]));
    return { numbersFreqSorted, starsFreqSorted };
}

async function main() {
    try {
        const result = freqAnalysis(await Fetch());

        const numbersArray = Array.from(result.numbersFreqSorted.keys());
        const starsArray = Array.from(result.starsFreqSorted.keys());

        console.log(`These are the most frequent numbers from highest to lowest: ${numbersArray}`);
        console.log(`These are the most frequent stars from highest to lowest: ${starsArray}`);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();