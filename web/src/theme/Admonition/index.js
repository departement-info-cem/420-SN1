import React from 'react';
import Admonition from '@theme-original/Admonition';

export default function AdmonitionWrapper(props) {
  // Types "no title"
  if (props.type === 'note-nt') {
    return <Admonition {...props} type="note" title="" />;
  }
  if (props.type === 'info-nt') {
    return <Admonition {...props} type="info" title="" />;
  }
  if (props.type === 'tip-nt') {
    return <Admonition {...props} type="tip" title="" />;
  }
  if (props.type === 'warning-nt') {
    return <Admonition {...props} type="warning" title="" />;
  }
  if (props.type === 'danger-nt') {
    return <Admonition {...props} type="danger" title="" />;
  }

  return <Admonition {...props} />;
}