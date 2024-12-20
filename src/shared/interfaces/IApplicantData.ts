export default interface IApplicantData {
    name: string;
    age: number;
    position: string;
    source: string;
    contactInfo: {
        phone: string;
        email: string;
    };
    appliedOn: string;
    prescreenedOn: string | null;
    interviewedOn: string | null;
    offeredOn: string | null;
    hiredOn: string | null;
    rejectedOn: string | null;
}