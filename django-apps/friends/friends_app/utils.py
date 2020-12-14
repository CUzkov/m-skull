def get_relation(s, command):
    if command == 'add':
        if s == '00':
            relation = ('01', '10')
            user_myfr_if_myfo = (0, 1, 0)
            purpose_myfr_if_myfo = (0, 0, 1)
        elif s == '10':
            relation = ('11', '11')
            user_myfr_if_myfo = (1, 0, -1)
            purpose_myfr_if_myfo = (1, -1, 0)
        elif s == '01':
            relation = ('01', '10')
            user_myfr_if_myfo = (0, 0, 0)
            purpose_myfr_if_myfo = (0, 0, 0)
        else:
            relation = ('11', '11')
            user_myfr_if_myfo = (0, 0, 0)
            purpose_myfr_if_myfo = (0, 0, 0)
    elif command == 'del':
        if s == '10':
            relation = ('10', '01')
            user_myfr_if_myfo = (0, 0, 0)
            purpose_myfr_if_myfo = (0, 0, 0)
        elif s == '01':
            relation = ('00', '00')
            user_myfr_if_myfo = (0, -1, 0)
            purpose_myfr_if_myfo = (0, 0, -1)
        elif s == '11':
            relation = ('10', '01')
            user_myfr_if_myfo = (-1, 0, 1)
            purpose_myfr_if_myfo = (-1, 1, 0)
    return (relation, user_myfr_if_myfo, purpose_myfr_if_myfo)
