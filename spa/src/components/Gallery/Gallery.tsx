import * as React from "react";
import {ReactElement, FC, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {IUserStore} from 'types/user';
import {IMoment} from 'types/moments';
import {API_MOMENT} from 'utils/api';

import './gallery.scss'

interface GalleryProps {
  moments: IMoment[];
}

export const Gallery: FC<GalleryProps> = ({
  moments
}: GalleryProps): ReactElement => {

  const userStore: IUserStore = useSelector(state => state.user);
  const galleryRef = useRef(null);

  useEffect(() => {
    const getVal = (elem, style) => { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
    const getHeight = (item) => { return item.querySelector('.content').getBoundingClientRect().height; };
    const resizeAll = () => {
        const altura = getVal(galleryRef.current, 'grid-auto-rows');
        const gap = getVal(galleryRef.current, 'grid-row-gap');
        galleryRef.current.querySelectorAll('.gallery-item').forEach(function (item: HTMLDivElement) {
            var el = item;
            el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
        });
    };
    galleryRef.current.querySelectorAll('img').forEach(function (item) {
        if (!item.complete) {
          item.addEventListener('load', function () {
              var altura = getVal(galleryRef.current, 'grid-auto-rows');
              var gap = getVal(galleryRef.current, 'grid-row-gap');
              var gitem = item.parentElement.parentElement;
              gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
          });
        }
    });    
    resizeAll();
  }, [moments]);

  return(
    <div className={'gallery'} ref={galleryRef}>
      {moments?.map((moment, index) => (
        <div className={'gallery-item'} key={index}>
          <div className={'content'}>
            <Link to={`/moment/${moment.id}/${userStore.id}/`} >
              <img src={API_MOMENT + moment.image[0]} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
