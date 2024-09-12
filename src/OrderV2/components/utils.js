import { forwardRef, useRef, useEffect } from 'react';
import LocationData from '../data/location.json';
import Channel from '../data/info';
import { originData } from './table/constants';

export const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <input type='checkbox' ref={resolvedRef} {...rest} />
    </div>
  );
});

export const formatDate = (dateString, hideTime) => {
  const dateObj = new Date(dateString);

  const formattedDate = dateObj.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });

  return hideTime
    ? formattedDate.slice(0, formattedDate.indexOf(','))
    : formattedDate;
};

export const formatCurrency = value => {
  return value ? value.toLocaleString() : '0';
};

export const findLocation = value => {
  const location = LocationData.Location.find(
    item => item.location_id === parseInt(value)
  );

  return location ? location.location_name : '';
};

export const getBusinessTypeName = businessTypeId => {
  const id = parseInt(businessTypeId);
  const channel = Channel.find(item => item.business_type_id === id);
  return channel ? channel.business_type_name : 'Unknown';
};

export function getOriginNameById(id) {
  const origin = originData.find(item => item.value === id);
  return origin ? origin.label : 'Дата байхгүй';
}

export function replaceUrlParam(url, paramName, paramValue) {
  var pattern = new RegExp('(\\?|\\&)(' + paramName + '=).*?(&|$)');
  var newUrl = url;

  if (url.search(pattern) >= 0) {
    newUrl = url.replace(pattern, '$1$2' + paramValue + '$3');
  } else {
    newUrl =
      newUrl +
      (newUrl.indexOf('?') > 0 ? '&' : '&') +
      paramName +
      '=' +
      paramValue;
  }

  return newUrl;
}
