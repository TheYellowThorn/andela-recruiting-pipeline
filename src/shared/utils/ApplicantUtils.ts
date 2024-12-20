import IApplicantData from '../interfaces/IApplicantData';
import IDateRange from './../interfaces/IDateRange';
import IMonthlyCount from '../interfaces/IMonthlyCount';
import IApplicationSourceCount from '../interfaces/IApplicationSourceCount';
import IApplicantFilterOptions from '../interfaces/IApplicantFilterOptions';

export default class ApplicantUtils {
    public static getPrescreenedApplicants(applicants: IApplicantData[]): IApplicantData[] {
        return applicants.filter((applicant: IApplicantData) => applicant.prescreenedOn !== null);
    }

    public static getInterviewedApplicants(applicants: IApplicantData[]): IApplicantData[] {
        return applicants.filter((applicant: IApplicantData) => applicant.interviewedOn !== null);
    }

    public static getOfferedApplicants(applicants: IApplicantData[]): IApplicantData[] {
        return applicants.filter((applicant: IApplicantData) => applicant.offeredOn !== null);
    }

    public static getHiredApplicants(applicants: IApplicantData[]): IApplicantData[] {
        return applicants.filter((applicant: IApplicantData) => applicant.hiredOn !== null);
    }

    public static getRejectedApplicants(applicants: IApplicantData[]): IApplicantData[] {
        return applicants.filter((applicant: IApplicantData) => applicant.rejectedOn !== null);
    }

    public static getUniqueSources(applicants: IApplicantData[]): string[] {
        return Array.from(new Set(applicants.map((applicant: IApplicantData) => applicant.source).sort()));
    }

    public static getUniqueRoles(applicants: IApplicantData[]): string[] {
        return Array.from(new Set(applicants.map((applicant: IApplicantData) => applicant.position).sort()));
    }

    public static getDateRangeForAppliedOn(applicants: IApplicantData[]): IDateRange {
        const uniqueDateSet: Set<string> = new Set(this.getDatesByRecruitmentStage(applicants, 'appliedOn'));
        const uniqueDates: string[] = Array.from(uniqueDateSet);
        const dateRange: IDateRange = {
            startDate: uniqueDates.length > 0 ? new Date(uniqueDates[0]) : null,
            endDate: uniqueDates.length > 1 ? new Date(uniqueDates[uniqueDates.length - 1]) : null,

        }
        return dateRange
    }

    public static getAppliedOnMonthlyData(applicants: IApplicantData[]): IMonthlyCount[] {
        const strDates: string[] = this.getDatesByRecruitmentStage(applicants, 'appliedOn');

        let monthlyData: IMonthlyCount = { month: '', count: 0 };
        let monthlyCountData: IMonthlyCount[] = [];
        
        for (let i: number = 0; i < strDates.length; i++) {

            const date = new Date(strDates[i]);
            const month = date.toLocaleString('default', { month: 'long' });

            monthlyData.count++;

            if (monthlyCountData.length === 0 || monthlyCountData[monthlyCountData.length - 1].month !== month) {
                monthlyData = { month, count: 0 };
                monthlyCountData.push(monthlyData);
                continue;
            }
        }
       
        return monthlyCountData;
    }

    public static getAppliedBySourceData(applicants: IApplicantData[]): IApplicationSourceCount[] {
        const counts = applicants.reduce((accumulator: any, curr: IApplicantData) => {
            accumulator[curr.source] = accumulator[curr.source] ? (accumulator[curr.source] += 1) : accumulator[curr.source] = 1;
            
            return accumulator;
        }, {})

        const keys: string[] = Object.keys(counts);
        const applicationSourceCount: IApplicationSourceCount[] = keys.map((keyName: string) => {
            return {
                source: keyName,
                count: counts[keyName]
            }
        })
       
        return applicationSourceCount;
    }

    public static getApplicantsHiredWithin(applicants: IApplicantData[], days: number): IApplicantData[] {
        const hiredApplicants: IApplicantData[] = this.getHiredApplicants(applicants);
        const applicantsHiredWithinTimePeriod: IApplicantData[] = hiredApplicants.filter(
            (applicant: IApplicantData) => this.getDaysBetweenDates(new Date(applicant.appliedOn), new Date(applicant.hiredOn as string)) <= days
        );
        return applicantsHiredWithinTimePeriod;
    }

    private static getDaysBetweenDates(date1: Date, date2: Date) {
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        
        // Convert dates to Date objects and normalize to UTC
        const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        
        // Calculate the difference in milliseconds
        const diffInMilliseconds = Math.abs(utcDate2 - utcDate1);
        
        // Calculate the number of days
        return Math.floor(diffInMilliseconds / oneDay);
    }

    public static getDatesByRecruitmentStage(applicants: IApplicantData[], recruitmentProperty: string): string[] {
        if (applicants.length === 0) {
            return [];
        }
        if (!applicants[0].hasOwnProperty(recruitmentProperty)) {
            throw Error(`The property ${recruitmentProperty} does not exist on type IApplicationData`);
        }
        return applicants.map((applicant: IApplicantData) => (applicant as any)[recruitmentProperty]).sort();
    }

    public static filterApplicants(applicants: IApplicantData[], filterOptions: IApplicantFilterOptions | null): IApplicantData[] {

        let filteredApplicants: IApplicantData[] = applicants.concat();
        if (!filterOptions) {
            return filteredApplicants;
        }
        if (filterOptions.role !== '' && filterOptions.role !== 'All') {
            filteredApplicants = filteredApplicants.filter((applicant: IApplicantData) => applicant.position === filterOptions.role);
        }
        if (filterOptions.source !== '' && filterOptions.source !== 'All') {
            filteredApplicants = filteredApplicants.filter((applicant: IApplicantData) => applicant.source === filterOptions.source);
        }
        if (filterOptions.fromDate) {
            filteredApplicants = filteredApplicants.filter((applicant: IApplicantData) => new Date(applicant.appliedOn) >= (filterOptions.fromDate as Date));
        }
        if (filterOptions.toDate) {
            filteredApplicants = filteredApplicants.filter((applicant: IApplicantData) => new Date(applicant.appliedOn) <= (filterOptions.toDate as Date));
        }
        return filteredApplicants;
    }
}