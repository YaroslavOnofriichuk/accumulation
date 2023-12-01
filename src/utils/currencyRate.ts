export default async function getCurrencyRate() {
    return fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
}
