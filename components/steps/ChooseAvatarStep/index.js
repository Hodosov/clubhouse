import React, { useEffect } from 'react';
import clsx from 'clsx';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { Avatar } from '../../Avatar';

import styles from './ChooseAvatarStep.module.scss';
import { useRef } from 'react';

export const ChooseAvatarStep = () => {
  const inputRef = useRef()
  const handleChangeImage = (e) => {}

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeImage)
    }
  }, [])

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/celebration.png"
        // title={`Okay, ${userData?.fullname}!`}
        description="How’s this photo?"
      />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={styles.avatar}>
          {/* <Avatar width="120px" height="120px" src={avatarUrl} letters={avatarLetters} /> */}
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputRef} type="file" hidden />
        <Button>
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
