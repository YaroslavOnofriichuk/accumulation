export default async function getCurrencyRate() {
    return fetch("https://bank.gov.ua/ua/open-data/api-dev")
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
