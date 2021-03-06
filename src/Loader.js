import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function LoaderFun(props) {
  if (props.showLoader) {
    console.log(props.showLoader);
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
  } else return null;
}
