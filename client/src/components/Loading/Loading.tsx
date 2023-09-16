import { useSelector } from "react-redux";
import "./loading.scss";
import { getGlobalLoading } from "../../redux/selectors/global/getGlobalLoading";

const Loading = () => {
  const loading: boolean = useSelector(getGlobalLoading);
  if (loading) {
    return (
      <div className="global-loading">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return null;
};

export default Loading;
