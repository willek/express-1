const express = require('express');
const uuid = require('uuid');
const members = require('../../entities/members');

const router = express.Router();


router.get('/', (req, res) => {
  res.json(members);
});

router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id, 10));

  if (found) {
    const data = members.filter((member) => member.id === parseInt(req.params.id, 10));
    res.json(data);
  } else {
    res.status(404).json({ msg: 'Not Found' });
  }
});

router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    status: 'active',
  };

  if (!newMember.name) {
    res.status(400).json({ msg: 'Name required' });
  }

  members.push(newMember);

  res.json(newMember);
});

router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id, 10));

  if (found) {
    const updMember = req.body;

    members.forEach((member) => {
      if (member.id === parseInt(req.params.id, 10)) {
        member.name = updMember.name || req.body.name;
        member.status = updMember.status || req.body.status;

        res.json({ msg: 'Member updated', member });
      }
    });
  } else {
    res.status(404).json({ msg: 'Not Found' });
  }
});

router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id, 10));

  if (found) {
    const data = members.filter((member) => member.id === parseInt(req.params.id, 10));
    res.json(data);
  } else {
    res.status(404).json({ msg: 'Not Found' });
  }
});

module.exports = router;
