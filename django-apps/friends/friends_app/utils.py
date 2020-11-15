def get_relation(s, command):
    if command == 'add':
        if s == '00':
            relation = ('01', '10')
        elif s == '10':
            relation = ('11', '11')
        elif s == '01':
            relation = ('01', '10')
        else:
            relation = ('11', '11')
    elif command == 'del':
        if s == '10':
            relation = ('10', '01')
        elif s == '01':
            relation = ('00', '00')
        elif s == '11':
            relation = ('10', '01')
    return relation
