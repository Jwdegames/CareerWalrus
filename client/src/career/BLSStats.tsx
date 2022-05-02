    /**
     * Creates an array from a property of a dataset
     * 
     * @param dataset The dataset that we are making the array from
     * @param property The property of the dataset to make the array from
     */
     export function getArray(dataset: any, property: string) {
        let array : any[] = [];
        for (let i = 0; i < dataset.length; i++) {
            array.push(dataset[i][property]);
        }
        return array;
    }

    /**
     * Makes the time array from a dataset given years and the month difference between each datapoint
     * 
     * @param dataset The dataset that we are making the time array from
     * @param yearProp The year property of the dataset
     * @param monthProp The month property of the dataset 
     */
    export function getTimeArray(dataset: any, yearProp: string, monthProp: string) {
        let monthDict : any = {
            "January" : 1,
            "February" : 2,
            "March" : 3,
            "April" : 4,
            "May" : 5,
            "June" : 6,
            "July" : 7,
            "August" : 8,
            "September:" : 9,
            "October" : 10,
            "November" : 11,
            "December" : 12
        }
        let array: any[] = [];
        let initialYear = parseInt(dataset[dataset.length - 1][yearProp]);
        for (let i = dataset.length - 1; i >= 0; i--) {
            let month = monthDict[dataset[i][monthProp]];
            // console.log("The month is " + month);
            let year = parseInt(dataset[i][yearProp]) - initialYear;
            // console.log("The year is " + year);
            array.push(year * 12 + month);
        }
        //console.log("The array is " + array);
        return array;
    }

    /**
     * Gets the average of a dataset
     */
    export function getAvg(dataset: any, property: string) {
        let sum = 0;
        let count = dataset.length;
        for (let i = 0; i < count; i++) {
            let value = parseInt(dataset[i][property], 10);
            sum += value;
            // console.log("Added " + value);
        }
        //console.log("The sume is " + sum);
        //console.log("There are " + count + " elements");
        return sum/count;
    }

        /**
     * Gets the average of an array
     */
    export function getAvgArray(array: any[]) {
        let sum = 0;
        let count = array.length;
        for (let i = 0; i < count; i++) {
            let value = parseInt(array[i]);
            if (isNaN(value)) continue;
            sum += value;
            // console.log("Added " + value);
        }
        //console.log("The sume is " + sum);
        //console.log("There are " + count + " elements");
        return sum/count;
    }
    

    /**
     * Returns the slope computed from the least squares method between a dataset of y and x points
     * 
     * @param xArray x array used in the least squares method
     * @param yArray y array used in the least squares method
     */
    export function getSlope(xArray: any, yArray: any) {
        let slope = 0;
        let xAvg = getAvgArray(xArray);
        let yAvg = getAvgArray(yArray);
        console.log("xArray: " + xArray);
        console.log("yArray: " + yArray);
        let numerator = 0;
        let denominator = 0;
        for (let i = 0; i < xArray.length && i < yArray.length; i++) {
            if (isNaN(xArray[i]) || isNaN(yArray[i])) {
                continue;
            }
            // console.log(xArray[i] + ", " + yArray[i]);
            // Get the numerator of the slope
            numerator += (xArray[i] - xAvg) * (yArray[i] - yAvg);
            denominator += Math.pow((xArray[i] - xAvg),2); 
        }
        slope = numerator / denominator;
        return slope;
    }