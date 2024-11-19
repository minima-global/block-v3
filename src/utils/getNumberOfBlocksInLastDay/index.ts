import { isBefore, subDays } from "date-fns";

function getTxPowTimeMilli(block: number): Promise<number> {
    return new Promise((resolve) => {
        MDS.cmd(`txpow block:${block}`, (res) => {
            resolve(res.response.header.timemilli);
        })
    })
}

async function getBlockCountForLast24Hours(topblock: number) {
    let block = 1685;
    let found: number | null = null;


    while (found === null) {
        const txPowTimeMilli = await getTxPowTimeMilli(topblock - block);

        if (isBefore(new Date(Number(txPowTimeMilli)), subDays(new Date(), 1))) {
            found = block;
            break;
        }

        if (block >= 1740) {
            break;
        }

        block = block + 1;
    }

    return found;
}

export default getBlockCountForLast24Hours;
