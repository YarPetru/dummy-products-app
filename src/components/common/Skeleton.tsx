import React from 'react';
import s from './Skeleton.module.scss';

interface iSkeleton {
  times: number;
  isStatic?: boolean;
  className?: string;
}

const Skeleton: React.FC<iSkeleton> = ({ times }) => {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div className={s.outerBox} key={i}>
          <div className={s.innerBox} />
        </div>
      );
    });

  return <div className={s.wrapper}>{boxes}</div>;
};

export default Skeleton;
