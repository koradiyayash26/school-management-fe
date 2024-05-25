import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import PropTypes from "prop-types";

const CardItem = ({ title, path, icon: Icon }) => {
  return (
    <Card className="w-full">
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-center space-x-4 rounded-md border mt-[24px] p-4">
          <Icon className="h-16 w-16" />
        </div>
      </CardContent>
      <CardFooter>
        <Link to={path} className="w-full">
          <Button className="w-full">{title}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default CardItem;
