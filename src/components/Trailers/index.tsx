import { FunctionComponent } from 'react'
import './style.css';
import { WEB_SIZE, WEB_FRAME, MOB_FRAME } from "../../utils"
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  videos: [{ id: string, key: string }],
  width: number,
  setTrailerData: any
};

const Trailers: FunctionComponent<Props> = ({ videos, width, setTrailerData }) => {

  const handleClose = (e: any) => {
    e.stopPropagation();
    setTrailerData(0);
  }

  return (
    <div className="trailer-container">
      <div className="trailer-popup">
        <CloseIcon style={{ color: "blue", cursor: "pointer" }} onClick={handleClose} />
        <div className="trailer-detail">
          {videos.length > 0 && videos.map((list, index: number) =>
            <div className="trailer-item" key={index}>
              <iframe
                title={list.id}
                width={width > WEB_SIZE ? WEB_FRAME : MOB_FRAME}
                height={width > WEB_SIZE ? WEB_FRAME : MOB_FRAME}
                src={`http://www.youtube.com/embed/${list.key}`}
                frameBorder="0">
              </iframe>
            </div>
          )}
        </div>
        {videos.length > 0 ? '' : 'No trailers found.'}
      </div>
    </div>
  );
}

export default Trailers;
