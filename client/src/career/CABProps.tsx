/**
 * Interface for the CABs and description of the CAB
 */
 export interface JobItemInterface{
    title: string,
    company: string,
    description: string,
    salary: string
    location: string
}

/**
 * Interface for the CABs only
 */
export interface JobButtonInterface{
    title: string,
    company: string,
    description: string,
    salary: string,
    location: string,
    updateFunc: Function;
    
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