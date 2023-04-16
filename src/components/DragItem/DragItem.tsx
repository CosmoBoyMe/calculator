import { FC, ReactNode, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DndTypes } from '../../shared/constants/DnDTypes';

type Props = {
  type: DndTypes;
  children: ReactNode;
  index?: number;
  canDrag?: boolean;
  setOverlayItemType?: (type: DndTypes | null) => void;
};

const DragItem: FC<Props> = ({
  type,
  children,
  index,
  canDrag = true,
  setOverlayItemType,
}) => {
  const [, drag] = useDrag(
    () => ({
      type,
      canDrag: () => canDrag,
      item: { type, index },
    }),
    [canDrag]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.values(DndTypes),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (isOver) {
      setOverlayItemType?.(type);
    }
    return () => setOverlayItemType?.(null);
  }, [isOver, setOverlayItemType, type]);

  return (
    <div className="drag-item" ref={(node) => drop(drag(node))}>
      {children}
    </div>
  );
};

export { DragItem };
