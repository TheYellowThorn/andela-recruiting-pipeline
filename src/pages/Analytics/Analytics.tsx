import { useEffect, useState } from 'react';
import FulfillmentMetricsChart from './FulfillmentMetricsChart/FulfillmentMetricsChart';
import PassThroughRatesChart from './PassThroughRatesChart/PassThroughRatesChart';
import ApplicationsByDateChart from './ApplicationsByDateChart/ApplicationsByDateChart';
import ApplicationsBySourceChart from './ApplicationsBySourceChart/ApplicationsBySourceChart';
import LoadingText from '../../components/LoadingText/LoadingText';
import useFetch from './../../hooks/useFetch';
import IApplicantData from './../../shared/interfaces/IApplicantData';
import IMonthlyCount from './../../shared/interfaces/IMonthlyCount';
import ApplicantUtils from '../../shared/utils/ApplicantUtils';
import IApplicantFilterOptions from './../../shared/interfaces/IApplicantFilterOptions';
import DatePicker from 'react-datepicker';
import IDateRange from '../../shared/interfaces/IDateRange';
import IApplicationSourceCount from '../../shared/interfaces/IApplicationSourceCount';
import './Analytics.scss';
import 'react-datepicker/dist/react-datepicker.css';
import ApplicantHireRatesChart from './ApplicantHireRatesChart/ApplicantHireRatesChart';
import HiresBySourceChart from './HiresBySourceChart/HiresBySourceChart';



const Analytics = () => {

  const {data: applicants, isPending, error } = useFetch<IApplicantData[]>('http://localhost:8000/applicants');

  const [totalFilteredApplicants, setTotalFilteredApplicants] = useState<number>(0);
  const [filteredApplicants, setFilteredApplicants] = useState<IApplicantData[] | null>(null);
  const [totalFilteredPrescreenedApplicants, setTotalFilteredPrescreenedApplicants ]= useState<number>(0);
  const [totalFilteredInterviewedApplicants, setTotalFilteredInterviewedApplicants ]= useState<number>(0);
  const [totalFilteredOfferedApplicants, setTotalFilteredOfferedApplicants ]= useState<number>(0);
  const [totalFilteredHiredApplicants, setTotalFilteredHiredApplicants ]= useState<number>(0);
  const [totalFilteredRejectedApplicants, setTotalFilteredRejectedApplicants ]= useState<number>(0);

  const [uniqueRecruitmentSources, setUniqueRecruitmentSources] = useState<string[]>([]);
  const [uniqueRecruitmentRoles, setUniqueRecruitmentRoles] = useState<string[]>([]);
  const [roleFilterValue, setRoleFilterValue] = useState<string>('All');
  const [sourceFilterValue, setSourceFilterValue] = useState<string>('All');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [minDate, setMinDate] = useState<Date | undefined>(new Date());
  const [maxDate, setMaxDate] = useState<Date | undefined>(new Date());

  const [applicationSubmissionChartData, setApplicationSubmissionChartData] = useState<{labels: string[], counts: number[] } | null>(null);
  const [passThroughChartData, setPassThroughChartData] = useState<number[] | null>(null);
  const [hireRateChartData, setHireRateChartData] = useState<number[] | null>(null);
  const [fulfillmentChartData, setFulfillmentChartData] = useState<number[] | null>(null);
  const [applicationsBySourceChartData, setApplicationsBySourceChartData] = useState<{labels: string[], counts: number[] } | null>(null);
  const [hiresBySourceChartData, setHiresBySourceChartData] = useState<{labels: string[], counts: number[] } | null>(null);

  const [applicantFilterOptions, setApplicantFilterOptions] = useState<IApplicantFilterOptions | null>(null);

  useEffect(() => {
      if (applicants) {
        setFilteredApplicants(ApplicantUtils.filterApplicants(applicants, applicantFilterOptions));
        setUniqueRecruitmentSources(ApplicantUtils.getUniqueSources(applicants));
        setUniqueRecruitmentRoles(ApplicantUtils.getUniqueRoles(applicants));
        resetFilters();
      }     
  }, [applicants]);

  useEffect(() => {
    if (!applicants) { return }
    setFilteredApplicants(ApplicantUtils.filterApplicants(applicants, applicantFilterOptions));
  }, [applicantFilterOptions]);

  useEffect(() => {
    updateApplicationSubmissionChartData();
    updatePassThroughChart();
    updateFulfillmentChart();
    updateApplicationsBySourceChart();
    updateHireRateChart();
    updateHiresBySourceChart();
  },
  [totalFilteredPrescreenedApplicants,
    totalFilteredInterviewedApplicants,
    totalFilteredOfferedApplicants,
    totalFilteredOfferedApplicants,
    totalFilteredHiredApplicants,
    totalFilteredRejectedApplicants
  ]);

  useEffect(() => {
    updateApplicationMetrics();
  }, [filteredApplicants]);

  const updateApplicationMetrics = (): void => {
    if (!filteredApplicants) { return }

    const prescreenedApplicants: IApplicantData[] = ApplicantUtils.getPrescreenedApplicants(filteredApplicants);
    setTotalFilteredPrescreenedApplicants(prescreenedApplicants.length);

    const interviewedApplicants: IApplicantData[] = ApplicantUtils.getInterviewedApplicants(filteredApplicants);
    setTotalFilteredInterviewedApplicants(interviewedApplicants.length);

    const offeredApplicants: IApplicantData[] = ApplicantUtils.getOfferedApplicants(filteredApplicants);
    setTotalFilteredOfferedApplicants(offeredApplicants.length);

    const hiredApplicants: IApplicantData[] = ApplicantUtils.getHiredApplicants(filteredApplicants);
    setTotalFilteredHiredApplicants(hiredApplicants.length);

    const rejectedApplicants: IApplicantData[] = ApplicantUtils.getRejectedApplicants(filteredApplicants);
    setTotalFilteredRejectedApplicants(rejectedApplicants.length);

    setTotalFilteredApplicants(filteredApplicants.length);
  }

  const resetFilters = () => {
    if (!applicants) {
      return;
    }

    setRoleFilterValue('All');
    setSourceFilterValue('All');

    const minMaxDateRange: IDateRange = ApplicantUtils.getDateRangeForAppliedOn(applicants);
    setMinDate(minMaxDateRange.startDate ? minMaxDateRange.startDate : undefined);
    setMaxDate(new Date());

    setStartDate(minMaxDateRange.startDate);
    setEndDate(new Date());

    setApplicantFilterOptions({
      role: 'All',
      source: 'All',
      fromDate: minMaxDateRange.startDate ? minMaxDateRange.startDate : null,
      toDate: new Date()
    });
  }

  const handleRoleFilterChange = (event: any): void => {
    if (!applicantFilterOptions) { return; }

    setRoleFilterValue(event.target.value);
    setApplicantFilterOptions({...applicantFilterOptions, role: event.target.value});
  };

  const handleSourceFilterChange = (event: any): void => {
    if (!applicantFilterOptions) { return; }

    setSourceFilterValue(event.target.value);
    setApplicantFilterOptions({...applicantFilterOptions, source: event.target.value});
  };

  const handleStartDateChange = (date: Date | null): void => {
    if (!applicantFilterOptions) { return; }

    setStartDate(date);
    setApplicantFilterOptions({...applicantFilterOptions, fromDate: date});
  }

  const handleEndDateChange = (date: Date | null): void => {
    if (!applicantFilterOptions) { return; }

    setEndDate(date);
    setApplicantFilterOptions({...applicantFilterOptions, toDate: date});
  }

  const handleResetFilters = (event: any) => {
    resetFilters();
  }

  const updateFulfillmentChart = (): void => {
    if (!filteredApplicants) { return }

    const fulfillmentChartData: number[] = [totalFilteredHiredApplicants, totalFilteredRejectedApplicants, totalFilteredApplicants - totalFilteredHiredApplicants - totalFilteredRejectedApplicants];
    setFulfillmentChartData(fulfillmentChartData);
  }

  const updatePassThroughChart = (): void => {
    if (!filteredApplicants) { return; }

    const passThroughChartData: number[] = [
      totalFilteredPrescreenedApplicants / filteredApplicants.length,
      totalFilteredInterviewedApplicants / filteredApplicants.length,
      totalFilteredOfferedApplicants / filteredApplicants.length,
      totalFilteredHiredApplicants / filteredApplicants.length,
    ]
 
    setPassThroughChartData(passThroughChartData);
  }

  const updateHireRateChart = (): void => {
    if (!filteredApplicants) { return }

    const hireRateChartData: number[] = [
      ApplicantUtils.getApplicantsHiredWithin(filteredApplicants, 7).length,
      ApplicantUtils.getApplicantsHiredWithin(filteredApplicants, 14).length,
      ApplicantUtils.getApplicantsHiredWithin(filteredApplicants, 30).length,
      ApplicantUtils.getApplicantsHiredWithin(filteredApplicants, 60).length
    ];
    setHireRateChartData(hireRateChartData);
  }
  

  const updateApplicationSubmissionChartData = (): void => {
    if (!filteredApplicants) {
      return;
    }

    const appliedOnMonthlyData: IMonthlyCount[] = ApplicantUtils.getAppliedOnMonthlyData(filteredApplicants);

    setApplicationSubmissionChartData({
      labels: appliedOnMonthlyData.map((monthlyCount: IMonthlyCount) => monthlyCount.month),
      counts: appliedOnMonthlyData.map((monthlyCount: IMonthlyCount) => monthlyCount.count)
    });    
  }

  function updateApplicationsBySourceChart(): void {
    if (!filteredApplicants || !applicants) { return }

    const applicationSourceCount: IApplicationSourceCount[] = ApplicantUtils.getAppliedBySourceData(filteredApplicants);

    setApplicationsBySourceChartData({
      labels: applicationSourceCount.map((applicationSourceCount: IApplicationSourceCount) => applicationSourceCount.source),
      counts: applicationSourceCount.map((applicationSourceCount: IApplicationSourceCount) => applicationSourceCount.count / filteredApplicants.length)
    });
  }

  function updateHiresBySourceChart(): void {
    if (!filteredApplicants || !applicants) { return }

    const hiresBySourceCount: IApplicationSourceCount[] = ApplicantUtils.getAppliedBySourceData(ApplicantUtils.getHiredApplicants(filteredApplicants));

    setHiresBySourceChartData({
      labels: hiresBySourceCount.map((applicationSourceCount: IApplicationSourceCount) => applicationSourceCount.source),
      counts: hiresBySourceCount.map((applicationSourceCount: IApplicationSourceCount) => applicationSourceCount.count / filteredApplicants.length)
    });
  }
  
  return (
    <section>
      <h2>Analytics</h2>
      <div className="home">
            { error && <div>{error}</div>}
            { isPending && <LoadingText label={'Loading Data...'} /> }
            
      </div>
      { applicants ? 
        <>

          <div className="filter-controls">
            <h3>Filter By</h3>
            <label className="select" htmlFor="recruitment-roles">Role
              <select name="recruitment-roles" onChange={handleRoleFilterChange} value={roleFilterValue}>
                <option key="recruitment-roles-0" value="All">All</option>
                { uniqueRecruitmentRoles.map((roleName: string, index: number) => {
                    return (
                      <option key={'recruitment-roles-' + (index + 1).toString()} value={roleName}>{roleName}</option>
                    );
                })}
              </select>
            </label>

            <label className="select" htmlFor="recruitment-sources">Source
              <select name="recruitment-sources" onChange={handleSourceFilterChange} value={sourceFilterValue}>
                <option key="recruitment-sources-0" value="All">All</option>
                { uniqueRecruitmentSources.map((sourceName: string, index: number) => {
                    return (
                      <option key={'recruitment-sources-' + (index + 1).toString()} value={sourceName}>{sourceName}</option>
                    );
                })}
              </select>
            </label>
            
            <label htmlFor="minDate">From Date</label>
            <DatePicker minDate={minDate} maxDate={maxDate} selected={startDate} onChange={handleStartDateChange} />
            
            <label htmlFor="maxDate">To Date</label>
            <DatePicker minDate={minDate} maxDate={maxDate} selected={endDate} onChange={handleEndDateChange} />

            <button onClick={handleResetFilters}>Reset</button>
            
          </div>
          
          { filteredApplicants && filteredApplicants.length > 0 ?
          <>
            <div className="metrics-container">
              <h3>Metrics</h3>
              <div>
                { fulfillmentChartData && 
                  <div className="chart-container">
                    <FulfillmentMetricsChart data={fulfillmentChartData} />
                  </div>
                }
                { passThroughChartData && 
                <div className="chart-container">
                  <PassThroughRatesChart data={passThroughChartData} />
                </div>
                }
                { passThroughChartData && 
                <div className="chart-container">
                  <ApplicantHireRatesChart data={hireRateChartData} />
                </div>
                }
                          
                
              </div>
            </div>
            <div className="metrics-container">
              { applicationSubmissionChartData && 
                <div className="chart-container">
                  <ApplicationsByDateChart data={applicationSubmissionChartData} />
                </div>
              }  
              { applicationsBySourceChartData && 
                <div className="chart-container">
                  <ApplicationsBySourceChart data={applicationsBySourceChartData} />
                </div>
              }
              { hiresBySourceChartData && 
                <div className="chart-container">
                  <HiresBySourceChart data={hiresBySourceChartData} />
                </div>
              }
            </div>
          </> :
          <p>No applicants found.</p>
          }
        </> : '' }
    </section>
  );
}

export default Analytics;
