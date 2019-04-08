import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/request">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.request" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/dic-type-of-trouble">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.dicTypeOfTrouble" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/dic-student-group">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.dicStudentGroup" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/dic-faculty">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.dicFaculty" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/dic-room">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.dicRoom" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/dic-dormitory">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.dicDormitory" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/announcement">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.announcement" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/jhi-user">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.jhiUser" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
