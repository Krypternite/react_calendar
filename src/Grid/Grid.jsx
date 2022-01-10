import React, { useState, useEffect, useRef } from 'react';
import styles from './Grid.module.scss';
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const Grid = () => {
  const [currentDate, setDate] = useState(new Date());
  const [today] = useState(new Date());
  const showToday = currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth();
  let gridBoxesArr = useRef(null).current;
  let currentDay = today.getDate();
  if (!gridBoxesArr) {
    gridBoxesArr = Array.from({ length: 6 }, (e) => Array(7).fill(null));
    let startDay = new Date(currentDate.getFullYear(), currentDate.getMonth()).getDay();
    let lastDay = 32 - new Date(currentDate.getFullYear(), currentDate.getMonth(), 32).getDate();
    let j = startDay;
    let count = 1;
    for (let i = 0; i < gridBoxesArr.length; i++) {
      while (j < 7) {
        gridBoxesArr[i][j] = { dayNumber: count, isCurrent: count === currentDay };
        if (count === lastDay) {
          break;
        }
        count++;
        j++;
      }
      j = 0;
      if (count === lastDay) {
        break;
      }
    }
  }

  const onMonthChange = (val) => {
    gridBoxesArr = null;
    if (val > 0) {
      if (currentDate.getMonth() === 11) {
        setDate(new Date(currentDate.getFullYear() + 1, 0, 1));
      } else {
        setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      }
    } else {
      if (currentDate.getMonth() === 0) {
        setDate(new Date(currentDate.getFullYear() - 1, 11, 1));
      } else {
        setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      }
    }
  };

  const onYearChange = (val) => {
    gridBoxesArr = null;
    if (val > 0) {
      setDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    } else {
      setDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    }
  };

  const goToToday = () => {
    setDate(new Date());
  }

  return (
    <div>
      <h1 className={styles.month_row}>
        <button onClick={() => onYearChange(-1)} className={styles.changers}>
          &lt;
        </button>
        {currentDate.getFullYear()}
        <button onClick={() => onYearChange(1)} className={styles.changers}>
          &gt;
        </button>
      </h1>
      <h2 className={styles.month_row}>
        <button onClick={() => onMonthChange(-1)} className={styles.changers}>
          &lt;
        </button>
        {new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(currentDate)}
        <button onClick={() => onMonthChange(1)} className={styles.changers}>
          &gt;
        </button>
      </h2>
      <div className={styles['days-names-row']}>
        {days.map((day, i) => (
          <div key={i} className={styles.days}>
            {day}
          </div>
        ))}
      </div>
      {gridBoxesArr.map((weekRow, i) => (
        <div className={styles.row} key={i}>
          {weekRow.map((day, i) => (
            <div key={i} className={styles.box}>
              <span className={showToday && day?.isCurrent ? styles.today : null}>
                <span>{day?.dayNumber}</span>
              </span>
            </div>
          ))}
        </div>
      ))}

      <div className={styles.todaybtn}>
        <button className={showToday ? '' : styles.visible} onClick={goToToday}>Go To Today</button>
      </div>
    </div>
  );
};

export default Grid;
