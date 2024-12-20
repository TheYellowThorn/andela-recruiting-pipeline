export default interface IApplicantFilterOptions {
    role: string;
    source: string;
    fromDate: Date | null;
    toDate: Date | null;
}