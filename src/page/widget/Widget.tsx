import React, { useEffect, useRef, useState } from "react";
import Grid from "../../components/widget/Grid";

type WidgetProps = {
  isEditing: boolean;
  isEditWidget: boolean;
  widgets: JSX.Element[];
};

const Widget = ({ isEditing, isEditWidget, widgets }: WidgetProps) => {
  return (
    <div className="content">
      <Grid
        isEditing={isEditing}
        isEditWidget={isEditWidget}
        widgets={widgets}
      />
    </div>
  );
};

export default Widget;
