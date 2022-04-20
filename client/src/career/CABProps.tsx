/**
 * Interface for the CABs
 */
 export interface JobItemInterface{
    title: string,
    company: string,
    description: string,
    salary: string
    location: string
}

export interface JobButtonInterface{
    title: string,
    company: string,
    salary: string
    location: string
}

/**
 * Class for the CABs since interfaces can't have object instances
 */

export class JobItem implements JobItemInterface {
    title = ""
    company = ""
    description = ""
    salary = ""
    location = ""

    constructor(t: string, c: string, d: string, s: string, l: string) {
        this.title = t;
        this.company = c;
        this.description = d;
        this.salary = s;
        this.location = l;
    }
}