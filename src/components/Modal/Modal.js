import React, { PropTypes } from 'react';

const Modal = ({ style: s, header, children, footer, fadeIn, display, toggle }) => (
  <span>
    {display && (
      <div
        key={s.modal}
        className={`${s.modal} ${s.fade} ${s['d-block']} ${fadeIn ? s.in : ''}`}
      >
        <div className={s['modal-dialog']}>
          <div className={s['modal-content']}>

            {header && (
              <div className={s['modal-header']}>
                <button
                  type="button"
                  className={s.close}
                  onClick={toggle}
                >
                  <span>×</span>
                </button>
                <h4 className={s['modal-title']}>
                  {header}
                </h4>
              </div>
            )}

            {children && (
              <div className={s['modal-body']}>
                {children}
              </div>
            )}

            {footer && (
              <div className={s['modal-footer']}>
                <small className={s['pull-xs-left']}>{footer.status}</small>
                {footer.button && (
                  <button
                    type="button"
                    className={`${s.btn} ${s['btn-primary']}`}
                    onClick={footer.click}
                  >
                    {footer.button}
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    )}
    {display && (
      <div
        className={`${s['modal-backdrop']} ${s.fade} ${fadeIn ? s.in : ''}`}
        onClick={toggle}
      ></div>
    )}
  </span>
);

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.shape({
    button: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    click: PropTypes.func,
    status: PropTypes.string,
  }),
  style: PropTypes.object,
  fadeIn: PropTypes.bool,
  display: PropTypes.bool,
  toggle: PropTypes.func,
};

export default Modal;
