'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/flower.module.scss';

export default function FlowerAnimation() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    // Remove paused state after 1s (mirrors the original JS onload)
    const t = setTimeout(() => {
      scene.classList.remove(styles['not-loaded']);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={sceneRef} className={`${styles['flower-scene']} ${styles['not-loaded']}`}>
      <div className={styles.night}></div>
      <div className={styles.flowers}>

        {/* Flower 1 */}
        <div className={`${styles.flower} ${styles['flower--1']}`}>
          <div className={`${styles.flower__leafs} ${styles['flower__leafs--1']}`}>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--1']}`}></div>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--2']}`}></div>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--3']}`}></div>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--4']}`}></div>
            <div className={styles['flower__white-circle']}></div>
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className={`${styles.flower__light} ${styles[`flower__light--${n}`]}`}></div>
            ))}
          </div>
          <div className={styles.flower__line}>
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className={`${styles['flower__line__leaf']} ${styles[`flower__line__leaf--${n}`]}`}></div>
            ))}
          </div>
        </div>

        {/* Flower 2 */}
        <div className={`${styles.flower} ${styles['flower--2']}`}>
          <div className={`${styles.flower__leafs} ${styles['flower__leafs--2']}`}>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--1']}`}></div>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--2']}`}></div>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--3']}`}></div>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--4']}`}></div>
            <div className={styles['flower__white-circle']}></div>
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className={`${styles.flower__light} ${styles[`flower__light--${n}`]}`}></div>
            ))}
          </div>
          <div className={styles.flower__line}>
            {[1,2,3,4].map(n => (
              <div key={n} className={`${styles['flower__line__leaf']} ${styles[`flower__line__leaf--${n}`]}`}></div>
            ))}
          </div>
        </div>

        {/* Flower 3 */}
        <div className={`${styles.flower} ${styles['flower--3']}`}>
          <div className={`${styles.flower__leafs} ${styles['flower__leafs--3']}`}>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--1']}`}></div>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--2']}`}></div>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--3']}`}></div>
            <div className={`${styles.flower__leaf} ${styles['flower__leaf--4']}`}></div>
            <div className={styles['flower__white-circle']}></div>
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className={`${styles.flower__light} ${styles[`flower__light--${n}`]}`}></div>
            ))}
          </div>
          <div className={styles.flower__line}>
            {[1,2,3,4].map(n => (
              <div key={n} className={`${styles['flower__line__leaf']} ${styles[`flower__line__leaf--${n}`]}`}></div>
            ))}
          </div>
        </div>

        {/* Long grass left */}
        <div className={`${styles['grow-ans']}`} style={{'--d': '1.2s'} as React.CSSProperties}>
          <div className={styles['flower__g-long']}>
            <div className={styles['flower__g-long__top']}></div>
            <div className={styles['flower__g-long__bottom']}></div>
          </div>
        </div>

        {/* Growing grass */}
        <div className={styles['growing-grass']}>
          <div className={`${styles.flower__grass} ${styles['flower__grass--1']}`}>
            <div className={styles['flower__grass--top']}></div>
            <div className={styles['flower__grass--bottom']}></div>
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className={`${styles['flower__grass__leaf']} ${styles[`flower__grass__leaf--${n}`]}`}></div>
            ))}
            <div className={styles['flower__grass__overlay']}></div>
          </div>
        </div>

        <div className={styles['growing-grass']}>
          <div className={`${styles.flower__grass} ${styles['flower__grass--2']}`}>
            <div className={styles['flower__grass--top']}></div>
            <div className={styles['flower__grass--bottom']}></div>
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className={`${styles['flower__grass__leaf']} ${styles[`flower__grass__leaf--${n}`]}`}></div>
            ))}
            <div className={styles['flower__grass__overlay']}></div>
          </div>
        </div>

        {/* Right leaves */}
        <div className={styles['grow-ans']} style={{'--d': '2.4s'} as React.CSSProperties}>
          <div className={`${styles['flower__g-right']} ${styles['flower__g-right--1']}`}>
            <div className={styles.leaf}></div>
          </div>
        </div>

        <div className={styles['grow-ans']} style={{'--d': '2.8s'} as React.CSSProperties}>
          <div className={`${styles['flower__g-right']} ${styles['flower__g-right--2']}`}>
            <div className={styles.leaf}></div>
          </div>
        </div>

        {/* Front plant */}
        <div className={styles['grow-ans']} style={{'--d': '2.8s'} as React.CSSProperties}>
          <div className={styles['flower__g-front']}>
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className={`${styles['flower__g-front__leaf-wrapper']} ${styles[`flower__g-front__leaf-wrapper--${n}`]}`}>
                <div className={styles['flower__g-front__leaf']}></div>
              </div>
            ))}
            <div className={styles['flower__g-front__line']}></div>
          </div>
        </div>

        {/* Front-right */}
        <div className={styles['grow-ans']} style={{'--d': '3.2s'} as React.CSSProperties}>
          <div className={styles['flower__g-fr']}>
            <div className={styles.leaf}></div>
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className={`${styles['flower__g-fr__leaf']} ${styles[`flower__g-fr__leaf--${n}`]}`}></div>
            ))}
          </div>
        </div>

        {/* Long grass groups */}
        {[
          { cls: 'long-g--0', delays: ['3s','2.2s','3.4s','3.6s'] },
          { cls: 'long-g--1', delays: ['3.6s','3.8s','4s','4.2s'] },
          { cls: 'long-g--2', delays: ['4s','4.2s','4.4s','4.6s'] },
          { cls: 'long-g--3', delays: ['4s','4.2s','3s','3.6s'] },
          { cls: 'long-g--4', delays: ['4s','4.2s','3s','3.6s'] },
          { cls: 'long-g--5', delays: ['4s','4.2s','3s','3.6s'] },
          { cls: 'long-g--6', delays: ['4.2s','4.4s','4.6s','4.8s'] },
          { cls: 'long-g--7', delays: ['3s','3.2s','3.5s','3.6s'] },
        ].map(({ cls, delays }) => (
          <div key={cls} className={`${styles['long-g']} ${styles[cls]}`}>
            {delays.map((d, i) => (
              <div key={i} className={styles['grow-ans']} style={{'--d': d} as React.CSSProperties}>
                <div className={`${styles.leaf} ${styles[`leaf--${i}`]}`}></div>
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
}
