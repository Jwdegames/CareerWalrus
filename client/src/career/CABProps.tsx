/**
 * Interface for the CABs and description of the CAB
 */
 export interface JobItemInterface{
    title: string,
    company: string,
    description: string,
    location: string
}

/**
 * Interface for the CABs only
 */
export interface JobButtonInterface{
    title: string,
    company: string,
    description: string,
    wikipedia: string,
    cpiData: any,
    location: string,
    blsLocation: string,
    updateFunc: Function,
    postDate: string;
}

/**
 * Class for the CABs since interfaces can't have object instances
 */

export class JobItem implements JobItemInterface {
    title = ""
    company = ""
    description = ""
    location = ""

    constructor(t: string, c: string, d: string, l: string) {
        this.title = t;
        this.company = c;
        this.description = d;
        this.location = l;
    }
}