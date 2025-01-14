import React from 'react';
import {
  Alert,
  AlertProps,
  AlertGroup,
  AlertActionCloseButton,
  AlertVariant,
  InputGroup
} from '@patternfly/react-core';

export const AlertGroupSingularDynamic: React.FunctionComponent = () => {
  const [alerts, setAlerts] = React.useState<Partial<AlertProps>[]>([]);

  const addAlert = (title: string, variant: AlertProps['variant'], key: React.Key) => {
    setAlerts(prevAlerts => [...prevAlerts, { title, variant, key }]);
  };

  const removeAlert = (key: React.Key) => {
    setAlerts(prevAlerts => [...prevAlerts.filter(alert => alert.key !== key)]);
  };

  const btnClasses = ['pf-c-button', 'pf-m-secondary'].join(' ');

  const getUniqueId = () => new Date().getTime();

  const addSuccessAlert = () => {
    addAlert('Toast success alert', 'success', getUniqueId());
  };

  const addDangerAlert = () => {
    addAlert('Toast danger alert', 'danger', getUniqueId());
  };

  const addInfoAlert = () => {
    addAlert('Toast info alert', 'info', getUniqueId());
  };

  return (
    <React.Fragment>
      <InputGroup style={{ marginBottom: '16px' }}>
        <button onClick={addSuccessAlert} type="button" className={btnClasses}>
          Add single success alert
        </button>
        <button onClick={addDangerAlert} type="button" className={btnClasses}>
          Add single danger alert
        </button>
        <button onClick={addInfoAlert} type="button" className={btnClasses}>
          Add single info alert
        </button>
      </InputGroup>
      <AlertGroup isLiveRegion>
        {alerts.map(({ title, variant, key }) => (
          <Alert
            isInline
            variant={AlertVariant[variant]}
            title={title}
            key={key}
            actionClose={
              <AlertActionCloseButton
                title={title as string}
                variantLabel={`${variant} alert`}
                onClose={() => removeAlert(key)}
              />
            }
          />
        ))}
      </AlertGroup>
    </React.Fragment>
  );
};
