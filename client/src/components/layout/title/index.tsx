import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";
import {logo, logosvg} from 'Assets'

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logosvg} alt="OhmyFood" width="28px" />
        ) : (
          <img src={logosvg} alt="OhmyFood" width="140px" />
        )}
      </Link>
    </Button>
  );
};
