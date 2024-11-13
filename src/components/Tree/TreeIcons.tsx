import React from 'react';
import assetIcon from '@public/icons/assetIcon.png';
import locationIcon from '@public/icons/locationIcon.png';
import Image from 'next/image';
import { DeepNode } from '@/types/tree';

export const NodeIcon = (node: DeepNode) => {
  switch (node.type) {
    case 'location':
      return <Image alt="Localização" src={locationIcon} />;
    default:
      return <Image alt="Localização" src={assetIcon} />;
  }
};
