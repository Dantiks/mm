import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hooks/useAppDispatch";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {selectMarkersApproved} from "../../features/markers/markersSlice";
import {fetchViolationTypes} from "../../features/violationTypes/violationTypesThunks";
import {fetchMarkersForMap} from "../../features/markers/markersThunks";
import GmailTabs from "../../components/List/GmailTabs";

const ApprovedViolations = () => {
  const dispatch = useAppDispatch();
  const markersApproved = useAppSelector(selectMarkersApproved);

  useEffect(() => {
    dispatch(fetchViolationTypes());
    dispatch(fetchMarkersForMap());
  }, [dispatch]);

  return (
    <div>
      <GmailTabs markers={markersApproved} />
    </div>
  );
};

export default ApprovedViolations;