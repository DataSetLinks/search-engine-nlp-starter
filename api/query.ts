"use server";

export async function queryAPI(query: string = "") {
    const token = process.env.DATALINKS_TOKEN;
    const apiURL = process.env.DATALINKS_API_URL;
    const datasetFlag = process.env.DATALINKS_DATASET;
    const useNaturalLanguageQuery = process.env.USE_NATURAL_LANGUAGE_QUERY === "1";

    if (!token) {
        throw new Error("DATALINKS_TOKEN is not set");
    }

    if (!apiURL) {
        throw new Error("DATALINKS_API_URL is not set");
    }

    if (!datasetFlag) {
        throw new Error("DATALINKS_DATASET is not set");
    }

    const url = `${apiURL}/query/`;
    let coordinates = datasetFlag.split("/")
    const username = coordinates[0];
    const namespace = coordinates[1];
    const dataset = coordinates[2];
    let body: QueryRequest = {
        username: username,
        namespace: namespace,
        dataset: dataset,
    };
    if (useNaturalLanguageQuery) {
        body.naturalLanguageQuery = query;
    } else {
        body.query = query;
    }

    console.log("Querying for:", {url, body});

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/text",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    const responseJson = await response.json();
    return responseJson.data;
}

interface QueryRequest {
    username: string;
    namespace: string;
    dataset: string;
    naturalLanguageQuery?: string;
    query?: string;
}
