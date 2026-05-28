import React, {useEffect} from 'react';
import GmailTabs from "../../components/List/GmailTabs";
import {fetchViolationTypes} from "../../features/violationTypes/violationTypesThunks";
import {fetchMarkersBeforeMap} from "../../features/markers/markersThunks";
import {useAppDispatch} from "../../app/hooks/useAppDispatch";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {selectMarkersNotApproved} from "../../features/markers/markersSlice";

const Main = () => {
  const dispatch = useAppDispatch();
  const markersNotApproved = useAppSelector(selectMarkersNotApproved);

  useEffect(() => {
    dispatch(fetchViolationTypes());
      dispatch(fetchMarkersBeforeMap());
  }, [dispatch]);

  return (
    <div>
      <GmailTabs markers={markersNotApproved} />
    </div>
  );
};

export default Main;